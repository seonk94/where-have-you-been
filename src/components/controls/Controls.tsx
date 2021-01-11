import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Controls = ({ children } : Props) => {
  return <div>{children}</div>;
};
export default Controls;