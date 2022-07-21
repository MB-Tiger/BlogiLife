import { useContext } from "react";

import { ToastContext } from "../context/context";

const useToastContext = () => {
  // get the context
  const context = useContext(ToastContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("ToastContext was used outside of its Provider");
  }

  return context;
};

export default useToastContext;
