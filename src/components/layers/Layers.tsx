import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layers = ({ children } : Props) => {
  return <div>{children}</div>;
};
export default Layers;