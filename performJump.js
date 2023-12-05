import * as P from 'process' 

const jumpLabels =
  JSON.parse(P.env.kak_opt_jumpLabelsPositions)

const targetLabel =
  jumpLabels.find(label => label.label === P.env.kak_text)

// This case is not a failure, it simply means that either not all of the characters of the label
// have yet been entered, or there was a typo and the user could correct themselves, so we
// just wait for a matching label.
if (targetLabel === undefined)
  P.exit()

const onDiscard =
  `
    execute-keys <esc>
    select -display-column ${ targetLabel.selectionDescription }
    execute-keys <semicolon>he
  `

const onAdd =
  `
    execute-keys <esc>
    eval -draft %{
      select -display-column ${ targetLabel.selectionDescription }
      exec <a-i>w
      set window jumpAddSelectionDesc %val{selection_desc}
    }
    select %opt{jumpAddSelectionDesc} %val{selections_desc}
    unset window jumpAddSelectionDesc
  `

const onExtend =
  `
    execute-keys <esc>
    select -display-column ${ targetLabel.selectionDescription }
    ${ targetLabel.jumpOrientationForward ? 'execute-keys HE' : '' }
  `

const onUnrecognized =
  `
    execute-keys <esc>
    fail "jumpJump: unrecognized switch '${ P.env.jumpMode }'"
  `

const jumpModeMap =
  { '': onDiscard
  , '-discard': onDiscard
  , '-add': onAdd
  , '-extend': onExtend
  }

console.log(jumpModeMap[P.env.jumpMode] || onUnrecognized)

