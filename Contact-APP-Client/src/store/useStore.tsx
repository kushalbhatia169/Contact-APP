// Import the useContext hook from React.
import { useContext } from "react";
// Import the context created in the store file.
import { context } from "./store";

// Define a custom hook to use the store
const useStore = () => {
  // Use the useContext hook to access the context.
  const { state, dispatch } = useContext(context);
  // Return the state and dispatch function.
  return { state, dispatch };
};

export default useStore;
