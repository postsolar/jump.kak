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
  jumpLabelFace PrimarySelection

declare-option -docstring "
  Face to use for dimming out non-label text.
  " str \
  jumpDimFace comment

# ***** Internal state
# Path to the source code of this file
declare-option -hidden str jumpSourcePath %val{source}

# Range specs for jump labels
declare-option -hidden range-specs jumpLabelsRanges

# Contents of the visible part of the buffer to be labeled
declare-option -hidden str jumpContents

# Selection description of the visible part of the buffer
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

  # Generate highlighting commands
  evaluate-commands %sh{
    # Environment variables to make accessible to the labels generating script
    # $kak_cursor_line
    # $kak_cursor_column
    # $kak_opt_jumpContentsRange
    # $kak_opt_jumpLabelFace
    # $kak_opt_jumpLabelsCharacters
    # $kak_opt_jumpExtraWordCharacters
    echo \
      "set-option window jumpLabelsRanges $kak_timestamp" \
      "$(echo "$kak_opt_jumpContents" | node "$(dirname $kak_opt_jumpSourcePath)/index.js")"
    echo \
      "add-highlighter window/jumpLabels replace-ranges 'jumpLabelsRanges'"
  }

  # Remove labels highlighters after the jump is executed or aborted
  define-command -hidden -override jumpRemoveHighlighters %{
    remove-highlighter window/jumpDim
    remove-highlighter window/jumpLabels
  }

  # Record keypresses and execute the jump as soon as there's a matching label
  define-command -hidden -override jumpOnPromptChange %{
    evaluate-commands %sh{
      node -e "
        const ranges = '$kak_opt_jumpLabelsRanges'
        const labelPositionMatches = ranges.match(/(\d+)\.(\d+),\d+\.\d+\|\{\w+\}$kak_text(\s|$)/)
        if (labelPositionMatches === null)
          process.exit()
        const labelPosition = labelPositionMatches.slice(1, 3)
        console.log('execute-keys <esc> ' + labelPosition[0] + 'g ' + labelPosition[1] + 'l eb')
      "
    }
  }

  # Initialize recording of keypresses to execute the jump
  prompt 'Jump to: ' -on-change jumpOnPromptChange -on-abort jumpRemoveHighlighters %{
  }

}

