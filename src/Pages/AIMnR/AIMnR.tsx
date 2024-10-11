import { AIRProvider } from "../../Context/useAI";
import { Outlet } from "react-router-dom";

const AIMnR = () => {
  return (
    <AIRProvider>
      <Outlet />
    </AIRProvider>
  );
};

export default AIMnR;
