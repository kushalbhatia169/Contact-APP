import { useContext } from "react";
import { context } from "./store";

// Define a custom hook to use the store
const useStore = () => {
  const { state, dispatch } = useContext(context);
  return { state, dispatch };
};

export default useStore;