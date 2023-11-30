module Main where

import Prelude

import Control.Alternative (guard)
import Data.Array as A
import Data.CodePoint.Unicode (isAlphaNum)
import Data.FoldableWithIndex (foldlWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (class Newtype)
import Data.String as S
import Data.String.CodePoints (CodePoint)
import Data.String.CodeUnits as SCU
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)
import Effect.Exception (throw)
import Node.Encoding (byteLength, Encoding(UTF8))
import Node.Process (lookupEnv) as Process
import Partial.Unsafe (unsafePartial, unsafeCrashWith)
import Yoga.JSON as JSON

main ∷ Effect Unit
main =
  kakouneEnvironment
    >>= getLabels
    >>> JSON.writeJSON
    >>> log

-- | A resulting label for a position in the buffer, like `cfx`.
type Label =
  String

-- | A position in the set of labels characters in use.
-- | Labels are assumed to consist of two letters, such that they form a sequence like `aa…zz`,
-- | so we track positions of current label's characters, e.g. at label `bd` we'd have position `Tuple 2 4`.
type CharsetPosition =
  Tuple Int Int

-- | A resulting description of a jump label.
type JumpPosition =
  { label ∷ Label
  , line ∷ Int
  , column ∷ Int
  , bytePosition ∷ Int
  , byteLength ∷ Int
  }

-- | Selection description for the visible part of the buffer.
-- | Start does not necessarily "come before" end, since selections can have either "direction".
type BufferSelectionDescription =
  { startLine ∷ Int
  , startColumn ∷ Int
  , endLine ∷ Int
  , endColumn ∷ Int
  }

type KakouneEnvironment =
  { buffer ∷ String
  , bufferSelection ∷ BufferSelectionDescription
  , currentLine ∷ Int
  , currentColumn ∷ Int
  , labelCharset ∷ Charset
  , extraWordCharacters ∷ Array CodePoint
  }

-- | An array of at least 10 unique code points used to generate jump labels.
newtype Charset = Charset (Array S.CodePoint)

derive instance newtypeCharset ∷ Newtype Charset _

charsetFromString ∷ String → Maybe Charset
charsetFromString =
  S.toCodePointArray >>> \cps →
    guard (A.length cps >= 10) $> Charset cps

kakouneEnvironment ∷ Effect KakouneEnvironment
kakouneEnvironment = do
  buffer              ← lookupOrThrow "kak_opt_jumpContents"
  bufferSelection     ← lookupOrThrow "kak_opt_jumpContentsRange"
                          >>= parseSelectionDescription
  currentLine'        ← lookupOrThrow "kak_cursor_line"
  currentColumn'      ← lookupOrThrow "kak_cursor_column"
  extraWordCharacters ← lookupOrThrow "kak_opt_jumpExtraWordCharacters"
                          <#> S.toCodePointArray
  labelCharset        ← lookupOrThrow "kak_opt_jumpLabelsCharacters"
                          >>= charsetFromString >>> maybe (error "invalid labels characters set") pure

  unsafePartial
    case
      Int.fromString currentLine', Int.fromString currentColumn'
      of
      Just currentLine, Just currentColumn →
        pure
          { buffer
          , currentLine
          , currentColumn
          , labelCharset
          , bufferSelection
          , extraWordCharacters
          }

  where
  parseSelectionDescription ∷ String → Effect BufferSelectionDescription
  parseSelectionDescription desc =
    case traverse Int.fromString $ S.split (S.Pattern ".") <=< S.split (S.Pattern ",") $ desc of
      Just [ startLine, startColumn, endLine, endColumn ] →
        pure { startLine, startColumn, endLine, endColumn }
      _ →
        error $ "couldn't parse selection description: " <> desc

  lookupOrThrow ∷ String → Effect String
  lookupOrThrow var = Process.lookupEnv var
    >>= maybe (error $ "couldn't find $" <> var <> " in the environment\n") pure

  error ∷ ∀ a. String → Effect a
  error msg = throw $ "[ERROR] JumpMode: " <> msg <> "\n"

getLabels ∷ KakouneEnvironment → Array JumpPosition
getLabels env@{ labelCharset: Charset labelCharset } =
  S.split (S.Pattern "\n") env.buffer
    # mapWithIndex indexLineWords
    -- Split the lines array at the current line in order to traverse
    -- it from that point in both directions
    # A.splitAt (env.currentLine - lineNrOffset + 1)
    # \{ before, after } → generateLabels (join before) (join after) zero []

  where
  lineNrOffset ∷ Int
  lineNrOffset = min env.bufferSelection.endLine env.bufferSelection.startLine

  generateLabels
    ∷ Array (Label → JumpPosition)
    → Array (Label → JumpPosition)
    → CharsetPosition
    → Array JumpPosition
    → Array JumpPosition
  generateLabels [] [] _ acc = acc
  generateLabels before after position acc = do
    let Tuple newLabel newPosition = nextLabel position
    case A.unsnoc before of
      Just { init, last } → do
        let acc' = A.cons (last newLabel) acc
        case A.uncons after of
          Just { head, tail } → do
            let Tuple newLabel' newPosition' = nextLabel newPosition
            let acc'' = A.snoc acc' (head newLabel')
            generateLabels init tail newPosition' acc''
          Nothing →
            generateLabels init [] newPosition acc'
      Nothing →
        case A.uncons after of
          Just { head, tail } → do
            let acc' = A.snoc acc (head newLabel)
            generateLabels [] tail newPosition acc'
          Nothing →
            acc

  indexLineWords ∷ Int → String → Array (Label → JumpPosition)
  indexLineWords lineNr line =
    let init = { prev: Nothing, bytePosition: 1, acc: [] } in
    _.acc $ foldlWithIndex go init (S.toCodePointArray line)

    where
    go
      ∷ Int
      → { prev ∷ Maybe CodePoint, bytePosition ∷ Int, acc ∷ Array (Label → JumpPosition) }
      → CodePoint
      → { prev ∷ Maybe CodePoint, bytePosition ∷ Int, acc ∷ Array (Label → JumpPosition) }
    go column { prev, bytePosition, acc } codepoint =
      { prev: Just codepoint
      , bytePosition: bytePosition + byteLength (S.singleton codepoint) UTF8
      , acc:
          let
            -- Slice of the line where the label is supposed to be
            -- Needed to get byte length of the label
            labelRangeSlice label = SCU.slice (column + 1) (column + S.length label + 1) line

            jumpPosition label =
              { line: lineNr + lineNrOffset
              , column: column + 1
              , bytePosition
              , byteLength: byteLength (labelRangeSlice label) UTF8
              , label
              }
          in
            case prev of
              Nothing
                | wordChar codepoint → A.snoc acc jumpPosition
                | otherwise → acc
              Just prev'
                | wordChar prev' → acc
                | wordChar codepoint → A.snoc acc jumpPosition
                | otherwise → acc
      }

    wordChar ∷ CodePoint → Boolean
    wordChar codepoint =
      isAlphaNum codepoint
        || A.elem codepoint env.extraWordCharacters

  nextLabel ∷ CharsetPosition → Tuple Label CharsetPosition
  nextLabel (Tuple ix1 ix2) =
    case A.index labelCharset ix1, A.index labelCharset ix2 of
      Just cp1, Just cp2 → Tuple (S.fromCodePointArray [ cp1, cp2 ]) nextIndexes
      _, _ → unsafeCrashWith "Index error"

    where
    nextIndexes
      | ix2 + 1 >= A.length labelCharset = Tuple (ix1 + 1) 0
      | otherwise = Tuple ix1 (ix2 + 1)

