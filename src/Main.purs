module Main where

import Prelude

import Control.Alternative (guard)
import Data.Array as A
import Data.CodePoint.Unicode (isAlphaNum)
import Data.FoldableWithIndex (foldlWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Maybe (Maybe(..), maybe)
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
import Partial.Unsafe (unsafeCrashWith)
import Yoga.JSON as JSON

main ∷ Effect Unit
main =
  kakouneEnvironment
    >>= getLabels
    >>> JSON.writeJSON
    >>> log

-- | Selection description for the visible part of the buffer.
-- | Start does not necessarily "come before" end, since selections can have either "direction".
type SelectionDescription =
  { startLine ∷ Int
  , startColumn ∷ Int
  , endLine ∷ Int
  , endColumn ∷ Int
  , orientation ∷ SelectionDescriptionOrientation
  }

data SelectionDescriptionOrientation
  = Forward
  | Backward

derive instance Eq SelectionDescriptionOrientation

-- | A resulting label for a position in the buffer, like `cfx`.
type Label =
  String

-- | A position in the set of labels characters in use.
-- | Labels are assumed to consist of two letters, such that they form a sequence like `aa…zz`,
-- | so we track positions of current label's characters, e.g. at label `bd` we'd have position `Tuple 2 4`.
type CharsetPosition =
  Tuple Int Int

-- | Selection description for a jump to be executed, in Kakoune format `line.col,line.col`.
-- | This is an *extending* selection description and it's thus tied to client's context (current selection).
-- | For selection-discarding jumps, it's simply followed by '<semicolon>' on Kakoune side.
type JumpSelectionDescription =
  String

-- | A resulting description of a jump label.
-- | Fields `labelByteLength`, `labelBytePosition` and `line` describe where to put the label,
-- | field `label` is label's characters and field `selectionDescription` will be used to execute
-- | the jump when it's picked. `jumpOrientationForward` is used after the jump to execute keys 'HE'.
type JumpPosition =
  { labelByteLength ∷ Int
  , labelBytePosition ∷ Int
  , label ∷ Label
  , line ∷ Int
  , selectionDescription ∷ JumpSelectionDescription
  , jumpOrientationForward ∷ Boolean
  }

type KakouneEnvironment =
  { bufferSelection ∷ SelectionDescription
  , bufferContent ∷ String
  , clientSelection ∷ SelectionDescription
  , extraWordCharacters ∷ Array CodePoint
  , labelCharset ∷ Charset
  , autoFlipSelection ∷ Boolean
  }

-- | An array of at least 10 unique code points used to generate jump labels.
newtype Charset = Charset (Array CodePoint)

charsetFromString ∷ String → Maybe Charset
charsetFromString =
  S.toCodePointArray >>> \cps →
    guard (A.length cps >= 10) $> Charset cps

kakouneEnvironment ∷ Effect KakouneEnvironment
kakouneEnvironment = ado
  autoFlipSelection   ← lookupOrThrow "kak_opt_jumpAutoFlipOnExtend"
                          >>= parseBoolean
  bufferContent       ← lookupOrThrow "kak_opt_jumpContents"
  bufferSelection     ← lookupOrThrow "kak_opt_jumpContentsRange"
                          >>= parseSelectionDescription
  clientSelection     ← lookupOrThrow "kak_selection_desc"
                          >>= parseSelectionDescription
  extraWordCharacters ← lookupOrThrow "kak_opt_jumpExtraWordCharacters"
                          <#> S.toCodePointArray
  labelCharset        ← lookupOrThrow "kak_opt_jumpLabelsCharacters"
                          >>= charsetFromString
                          >>> maybe (error "invalid labels characters set") pure
  in
    { autoFlipSelection
    , bufferContent
    , bufferSelection
    , clientSelection
    , extraWordCharacters
    , labelCharset
    }

  where
  lookupOrThrow ∷ String → Effect String
  lookupOrThrow var = Process.lookupEnv var
    >>= maybe (error $ "couldn't find $" <> var <> " in the environment") pure

  error ∷ ∀ a. String → Effect a
  error msg = throw $ "[ERROR] JumpMode: " <> msg <> "\n"

  parseBoolean ∷ String → Effect Boolean
  parseBoolean = case _ of
    "true" → pure true
    "false" → pure false
    x → error $ "couldn't parse Boolean: " <> x

  parseSelectionDescription ∷ String → Effect SelectionDescription
  parseSelectionDescription desc =
    case traverse Int.fromString $ S.split (S.Pattern ".") <=< S.split (S.Pattern ",") $ desc of
      Just [ startLine, startColumn, endLine, endColumn ] →
        pure
          { startLine
          , startColumn
          , endLine
          , endColumn
          , orientation:
              if endLine > startLine || (endLine == startLine && endColumn > startColumn)
              then Forward
              else Backward
          }
      _ →
        error $ "couldn't parse selection description: " <> desc

getLabels ∷ KakouneEnvironment → Array JumpPosition
getLabels env@{ labelCharset: Charset labelCharset } =
  S.split (S.Pattern "\n") env.bufferContent
    # mapWithIndex indexLineWords
    -- Split the lines array at the current line in order to traverse
    -- it from that point in both directions
    # A.splitAt (cursorLine - lineNrOffset + 1)
    # \{ before, after } → generateLabels (join before) (join after) zero []

  where
  lineNrOffset ∷ Int
  lineNrOffset = min env.bufferSelection.startLine env.bufferSelection.endLine

  cursorLine ∷ Int
  cursorLine = case env.bufferSelection.orientation of
    Forward → env.clientSelection.endLine
    Backward → env.clientSelection.startLine

  cursorColumn ∷ Int
  cursorColumn = case env.bufferSelection.orientation of
    Forward → env.clientSelection.endColumn
    Backward → env.clientSelection.startColumn

  jumpOrientation ∷ Int → Int → SelectionDescriptionOrientation
  jumpOrientation lineNr column
    | lineNr > cursorLine = Forward
    | lineNr == cursorLine && column > cursorColumn = Forward
    | otherwise = Backward

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

            orientation = jumpOrientation (lineNr + lineNrOffset) column

            selectionDescription =
              let
                selStart =
                  if orientation == env.clientSelection.orientation || not env.autoFlipSelection
                  then show env.clientSelection.startLine <> "." <> show env.clientSelection.startColumn
                  else show env.clientSelection.endLine <> "." <> show env.clientSelection.endColumn
              in
                selStart <> "," <> show (lineNr + lineNrOffset) <> "." <> show (column + 1)

            jumpPosition label =
              { label
              , labelByteLength: byteLength (labelRangeSlice label) UTF8
              , labelBytePosition: bytePosition
              , line: lineNr + lineNrOffset
              , selectionDescription
              , jumpOrientationForward: orientation == Forward
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

