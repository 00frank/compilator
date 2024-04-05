import React from 'react';
import { Drawer } from '../../compiler';

const CodeResult = ({ ast }) => {
  return (
    <div className="bg-gradient-to-b from-cyan-200 from-70% to-green-700 h-[144px] mt-6 p-2 w-full flex gap-2 items-end">
      <Drawer ast={ast} />
    </div>
  )
}

export default CodeResult