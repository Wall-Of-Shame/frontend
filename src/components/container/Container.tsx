import React from "react";

import "./Container.css";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  return <div className='container ion-padding'>{props.children}</div>;
};

export default Container;
