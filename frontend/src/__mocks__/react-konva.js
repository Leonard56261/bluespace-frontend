import React from 'react';

module.exports = {
  Stage: React.forwardRef((props, ref) => (
    <div
      {...props}
      ref={ref}
      onMouseDown={(e) => {
        console.log('Stage onMouseDown triggered');
        if (props.onMouseDown) props.onMouseDown(e);
      }}
      onMouseMove={(e) => {
        console.log('Stage onMouseMove triggered');
        if (props.onMouseMove) props.onMouseMove(e);
      }}
      onMouseUp={(e) => {
        console.log('Stage onMouseUp triggered');
        if (props.onMouseUp) props.onMouseUp(e);
      }}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  )),
  Layer: (props) => <div {...props}>{props.children}</div>,
  Line: (props) => (
    <div
      {...props}
      data-testid={props['data-testid']}
      style={{ stroke: props.stroke }}
      data-points={JSON.stringify(props.points)}
    />
  ),
};
