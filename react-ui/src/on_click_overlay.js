import React from 'react';

export default function OnClickOverlay(props) {
  return (
    <div
      className="on-click-overlay"
      onClick={ e => {
        e.preventDefault();
        props.handleOnClick()
      }}
    ></div>
  )
}
