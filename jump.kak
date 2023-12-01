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
  Face to use for highlighting jump labels.
  " str \
  jumpLabelFace 'rgb:f07a2b+f'

declare-option -docstring "
  Face to use for dimming out non-label text.
  " str \
  jumpDimFace comment

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

define-command jumpJump \
  -params 0 \
  -docstring "Perform a labels-based jump within the visible part of the buffer " \
  %{

  # Grab window content and push it into respective options
  eval -draft %{
    exec Gb Gl <a-semicolon> Gt
    set-option window jumpContents %val{selection}
    set-option window jumpContentsRange %val{selection_desc}
  }

  # Add dim face to everything
  add-highlighter window/jumpDim regex "(.*)" %sh{ echo "1:$kak_opt_jumpDimFace" }

  # Generate JSON describing positions of jump labels
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

  # Extract labels' range-specs from resulting JSON
  # For some reason setting the option directly doesn't work here
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

  # Add highlighters for labels
  add-highlighter window/jumpLabels replace-ranges 'jumpLabelsRanges'

  # Remove labels highlighters after the jump is executed or aborted
  define-command -hidden -override jumpRemoveHighlighters %{
    remove-highlighter window/jumpDim
    remove-highlighter window/jumpLabels
  }

  # Record keypresses and execute the jump as soon as there's a matching label
  define-command -hidden -override jumpOnPromptChange %{
    evaluate-commands %sh{
      node -e "
        const jumpLabels = JSON.parse('$kak_opt_jumpLabelsPositions')
        const targetLabel = jumpLabels.find(label => label.label === '$kak_text')
        if (targetLabel === undefined)
          process.exit()
        console.log('execute-keys <esc> ' + targetLabel.line + 'g ' + (targetLabel.column - 1) + 'l eb')
      "
    }
  }

  # Initialize recording of keypresses to execute the jump
  prompt 'Jump to: ' -on-change jumpOnPromptChange -on-abort jumpRemoveHighlighters %{
    # Prevent erroneous entry from keeping labels highlighting around
    jumpRemoveHighlighters
    echo -markup '{Error}Jump label not found'
  }

}

