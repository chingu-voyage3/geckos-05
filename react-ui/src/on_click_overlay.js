import React from 'react';

export default function OnClickOverlay(props) {
  const classList = props.className ? " " + props.className : "";
  return (
    <div
      className={ "on-click-overlay" + classList }
      onClick={ e => {
        e.preventDefault();
        props.handleOnClick()
      }}
    ></div>
  )
}
