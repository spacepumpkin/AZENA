import React, { useRef } from 'react';

export default function ContextMenu({ buttonInfo, contextMenuRef }) {
  // Takes in buttonInfo object -- keys are names of the buttons, values are the respective onClick functions

  // const contextMenuRef = useRef();

  let buttons = [];
  let i = 0;
  for (let name in buttonInfo) {
    buttons.push(
      <ContextMenuButton key={i} name={name} action={buttonInfo[name]} />
    )
    i++;
  }

  return (
    <div className={`context-menu`} ref={contextMenuRef}>
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