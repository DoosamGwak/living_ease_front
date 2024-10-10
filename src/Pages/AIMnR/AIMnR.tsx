import React from "react";
import { AIRProvider } from "../../Context/useAI";
import { Outlet } from "react-router-dom";

type Props = {};

const AIMnR = (props: Props) => {
  return (
    <AIRProvider>
      <Outlet />
    </AIRProvider>
  );
};

export default AIMnR;
