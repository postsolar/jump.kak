# ***** User options
declare-option -docstring "
  Characters to be used in labels. Must be at least 10 characters long.
  " str \
  jumpLabelsCharacters "abcdefghijklmnopqrstuvwxyz"

declare-option -docstring "
  Additional characters, aside from alphanumerics, to consider as part of contiguous words for generating labels.
  " str \
  jumpExtraWordCharacters "_-"

declare-option -docstring "
  Face to use for highlighting jump labels. Set to `default` to not apply any highlighting at all.
  " str \
  jumpLabelFace 'rgb:f07a2b+f'

declare-option -docstring "
  Face to use for dimming out non-label text. Set to `default` to not apply any dimming at all.
  " str \
  jumpDimFace comment

declare-option -docstring "
  Whether your current selection should be automatically flipped before executing an extending jump in order for it to only grow and never shrink.
  If set to true, and an extending jump forward from point A to point B is performed, followed by an extending jump backward past
  the original point A to point C, resulting selection will include the whole C-B range. Otherwise, naturally, it would include only selection A-B.
  " bool \
  jumpAutoFlipOnExtend yes

# ***** Internal state
# Path to the source code of this file.
declare-option -hidden str jumpSourcePath %val{source}

# Range-specs to use for labels.
declare-option -hidden range-specs jumpLabelsRanges

# JSON string describing jump positions. Contains labels' strings,
# byte positions to generate range-specs and character positions
# to perform a jump after a label is chosen.
declare-option -hidden str jumpLabelsPositions

# Contents of the visible part of the buffer to be labeled.
declare-option -hidden str jumpContents

# Selection description of the visible part of the buffer.
declare-option -hidden str jumpContentsRange

# Grab window content and push it into respective options
define-command -hidden jumpSelectWindow %{
  eval -draft %{
    exec Gb Gl <a-semicolon> Gt
    set-option window jumpContents %val{selection}
    set-option window jumpContentsRange %val{selection_desc}
  }
}

# Add dim face to everything
define-command -hidden jumpAddDimHL %{
  add-highlighter window/jumpDim regex "(.*)" %sh{ echo "1:$kak_opt_jumpDimFace" }
}

# Generate JSON describing positions of jump labels
define-command -hidden jumpGetLabelsJSON %{
  set-option window jumpLabelsPositions %sh{
    # Environment variables to make accessible to the labels generating script
    # $kak_opt_jumpContents
    # $kak_cursor_line
    # $kak_cursor_column
    # $kak_opt_jumpContentsRange
    # $kak_opt_jumpLabelsCharacters
    # $kak_opt_jumpExtraWordCharacters
    node "$(dirname $kak_opt_jumpSourcePath)/index.js"
  }
}

# Extract labels' range-specs from resulting JSON
# For some reason setting the option directly doesn't work here
define-command -hidden jumpSetLabels %{
  evaluate-commands %sh{
    printf "set-option window jumpLabelsRanges $kak_timestamp "
    node -e "
      const jumpLabels = JSON.parse('$kak_opt_jumpLabelsPositions')
      jumpLabels.forEach
        ( l => process.stdout.write
            ( l.line
            + '.'
            + l.bytePosition
            + '+'
            + l.byteLength
            + '|{$kak_opt_jumpLabelFace}'
            + l.label
            + ' '
            )
        )
    "
  }

  add-highlighter window/jumpLabels replace-ranges 'jumpLabelsRanges'
}

define-command -hidden jumpPrepareJump %{
  jumpSelectWindow
  jumpAddDimHL
  jumpGetLabelsJSON
  jumpSetLabels
}

# Remove labels highlighters after the jump is executed or aborted
define-command -hidden jumpRemoveHighlighters %{
  remove-highlighter window/jumpDim
  remove-highlighter window/jumpLabels
}

# Record keypresses and execute the jump as soon as there's a matching label
define-command -hidden jumpOnPromptChange %{
  evaluate-commands %sh{
    node -e "
      const jumpLabels = JSON.parse('$kak_opt_jumpLabelsPositions')
      const targetLabel = jumpLabels.find(label => label.label === '$kak_text')
      if (targetLabel === undefined) process.exit()
      // console.log('execute-keys <esc> ' + targetLabel.line + 'g ' + (targetLabel.column - 1) + 'l eb')
      console.log('execute-keys <esc> ' + targetLabel.line + 'g ' + (targetLabel.column - 1) + 'l he')
    "
  }
}

define-command -hidden jumpExtendOnPromptChange %{
  evaluate-commands %sh{
    node -e "
      const jumpLabels = JSON.parse('$kak_opt_jumpLabelsPositions')
      const targetLabel = jumpLabels.find(label => label.label === '$kak_text')
      if (targetLabel === undefined) process.exit()

      const [ selStartLine, selStartCol, selEndLine, selEndCol ] =
        '$kak_selection_desc'.match(/\d+/g)

      const selOrientedForward =
        selEndLine > selStartLine
          || selEndLine === selStartLine && selEndCol > selStartCol

      const jumpIsForward =
        targetLabel.line > $kak_cursor_line
          || (targetLabel.line === $kak_cursor_line && targetLabel.column > $kak_cursor_column)

      const flipSelection =
        $kak_opt_jumpAutoFlipOnExtend
          && selOrientedForward !== jumpIsForward
          ? '<a-semicolon>'
          : ''

      const extendRight =
        targetLabel.column === 1 && !jumpIsForward
          ? ''
          : (targetLabel.column - 1) + 'L'

      const lastKeyPress = jumpIsForward ? 'E' : ''
      console.log('execute-keys <esc> ' + flipSelection + targetLabel.line + 'G' + extendRight + lastKeyPress)
    "
  }
}

# We execute the jump as soon as the label is found,
# without requiring the user to explicitly submit the prompt,
# so a prompt that is submitted is by definition erroneous.
define-command -hidden jumpOnPromptSubmit %{
  jumpRemoveHighlighters
  echo -markup '{Error}Jump label not found'
}

define-command jumpJump \
  -params 0 \
  -docstring "Perform a labels-based jump within the visible part of the buffer" \
  %{
  jumpPrepareJump
  prompt 'Jump to: ' -on-change jumpOnPromptChange -on-abort jumpRemoveHighlighters jumpOnPromptSubmit
}

define-command jumpExtend \
  -params 0 \
  -docstring "Perform a labels-based jump within the visible part of the buffer, extending current selection" \
  %{
  jumpPrepareJump
  prompt 'Extend to: ' -on-change jumpExtendOnPromptChange -on-abort jumpRemoveHighlighters jumpOnPromptSubmit
}

