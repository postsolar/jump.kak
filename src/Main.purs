module Main where

import Prelude

import Control.Alternative (guard, class Alternative)
import Data.Array as A
import Data.CodePoint.Unicode (isAlphaNum)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Int as Int
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (class Newtype)
import Data.String as S
import Data.String.CodePoints (CodePoint)
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Effect.Exception (throw)
import Node.Process (stdin, lookupEnv) as Process
import Node.Stream.Aff (readableToStringUtf8) as Stream.Aff
import Partial.Unsafe (unsafePartial, unsafeCrashWith)

main ∷ Effect Unit
main = launchAff_ do
  stdin ← Stream.Aff.readableToStringUtf8 Process.stdin
  env ← liftEffect $ (_ $ stdin) <$> kakouneEnvironment

  let
    labels = getLabels env

    printLabelRange { line, column, label } = " "
      <> show line
      <> "."
      <> show column
      <> "+"
      <> show (S.length label)
      <> "|{" <> env.labelFace <> "}"
      <> label

  log $ A.foldMap printLabelRange labels

-- | A resulting label for a position in the buffer, like `cfx`.
type Label =
  String

-- | A position in the set of labels characters in use.
-- | Labels are assumend to consist of two letters, such that they form a sequence like `aa…zz`,
-- | so we track positions of current label's characters, e.g. at label `bd` we'd have position `Tuple 2 4`.
type LabelsPosition =
  Tuple Int Int

-- | A resulting position for a jump, these get composed together into a single range-specs-setting command.
type JumpPosition =
  { label ∷ Label
  , line ∷ Int
  , column ∷ Int
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
  , labelFace ∷ String
  }

-- | An array of at least 10 unique code points used to generate jump labels.
newtype Charset = Charset (Array S.CodePoint)

derive instance newtypeCharset ∷ Newtype Charset _

charsetFromString ∷ String → Maybe Charset
charsetFromString =
  S.toCodePointArray >>> \cps →
    guard (A.length cps >= 10) $> Charset cps

kakouneEnvironment ∷ Effect (String → KakouneEnvironment)
kakouneEnvironment = do
  bufferSelection     ← lookupOrThrow "kak_opt_jumpContentsRange"
                          >>= parseSelectionDescription
  currentLine'        ← lookupOrThrow "kak_cursor_line"
  currentColumn'      ← lookupOrThrow "kak_cursor_column"
  extraWordCharacters ← lookupOrThrow "kak_opt_jumpExtraWordCharacters"
                          <#> S.toCodePointArray
  labelCharset        ← lookupOrThrow "kak_opt_jumpLabelsCharacters"
                          >>= charsetFromString >>> maybe (error "invalid labels characters set") pure
  labelFace           ← lookupOrThrow "kak_opt_jumpLabelFace"

  unsafePartial
    case
      Int.fromString currentLine', Int.fromString currentColumn'
      of
      Just currentLine, Just currentColumn →
        pure
          { buffer: _
          , currentLine
          , currentColumn
          , labelCharset
          , bufferSelection
          , extraWordCharacters
          , labelFace
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
    # \{ before, after } → go (join before) (join after) zero []

  where
  lineNrOffset ∷ Int
  lineNrOffset = min env.bufferSelection.endLine env.bufferSelection.startLine

  go
    ∷ Array (Label → JumpPosition)
    → Array (Label → JumpPosition)
    → LabelsPosition
    → Array JumpPosition
    → Array JumpPosition
  go [] [] _ acc = acc
  go before after position acc = do
    let Tuple newLabel newPosition = nextLabel position
    case A.unsnoc before of
      Just { init, last } → do
        let acc' = A.cons (last newLabel) acc
        case A.uncons after of
          Just { head, tail } → do
            let Tuple newLabel' newPosition' = nextLabel newPosition
            let acc'' = A.snoc acc' (head newLabel')
            go init tail newPosition' acc''
          Nothing →
            go init [] newPosition acc'
      Nothing →
        case A.uncons after of
          Just { head, tail } → do
            let acc' = A.snoc acc (head newLabel)
            go [] tail newPosition acc'
          Nothing →
            acc

  indexLineWords ∷ Int → String → Array (Label → JumpPosition)
  indexLineWords lineNr line = foldMapWithIndex goLine $ S.toCodePointArray line

    where
    goLine ∷ ∀ m. Monad m ⇒ Alternative m ⇒ Int → CodePoint → m (Label → JumpPosition)
    goLine column codepoint = do
      guard (wordChar codepoint)
      let jumpPosition = { line: lineNr + lineNrOffset, column: column + 1, label: _ }
      case S.codePointAt (column - 1) line of
        Just prev → guard (not wordChar prev) $> jumpPosition
        -- First character of the line so it's always the word start
        Nothing → pure jumpPosition

    wordChar ∷ CodePoint → Boolean
    wordChar codepoint =
      isAlphaNum codepoint
        || A.elem codepoint env.extraWordCharacters

  nextLabel ∷ LabelsPosition → Tuple Label LabelsPosition
  nextLabel (Tuple ix1 ix2) =
    case A.index labelCharset ix1, A.index labelCharset ix2 of
      Just cp1, Just cp2 → Tuple (S.fromCodePointArray [ cp1, cp2 ]) nextIndexes
      _, _ → unsafeCrashWith "Index error"

    where
    nextIndexes
      | ix2 + 1 >= A.length labelCharset = Tuple (ix1 + 1) 0
      | otherwise = Tuple ix1 (ix2 + 1)

