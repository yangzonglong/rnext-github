import React, { memo } from 'react';
import { Resizable } from 'react-resizable';

const draggableOpts = { enableUserSelectHack: false };

export default memo((props: any) => {

  const { onResize, width, ...restProps } = props;

  if (!width) return <th {...restProps}></th>;

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={draggableOpts}>
      <th {...restProps}></th>
    </Resizable>
  )
})