import React from 'react';
import OnClickOverlay from './on_click_overlay';

export default function ClickOutsideOverlay(props) {
  return (
    <OnClickOverlay
      className="click-outside-overlay"
      handleOnClick={ props.handleOnClick }
    />
  )
}
