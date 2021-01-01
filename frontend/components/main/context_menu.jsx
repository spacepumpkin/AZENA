import React from 'react';

export default function ContextMenu({ buttonInfo }) {
  // Takes in buttonInfo object -- keys are names of the buttons, values are the respective onClick functions

  let buttons = [];

  for (let name in buttonInfo) {
    buttons.push(
      <ContextMenuButton name={name} action={buttonInfo[name]} />
    )
  }

  return (
    <div className={`context-menu`} >
      {buttons}
    </div>
  )
}

function ContextMenuButton({ name, action }) {
  return (
    <button type="button" onClick={action}>
      {name}
    </button>
  )
}