import { useEffect, useReducer, useRef } from "react";
import Display from "./Display";
import CalcGrid from "./CalcGrid";
import { initValue, useReducerFn } from "./reducer";
import handleKeyInput from "./handleKeyInput";

const App = () => {
  const [state, dispatch] = useReducer(useReducerFn, initValue);
  const docRef = useRef(document);

  const onKeyPress = (e: KeyboardEvent) => handleKeyInput(e, dispatch);

  useEffect(() => {
    const node = docRef.current;
    node.addEventListener("keydown", onKeyPress);

    return () => {
      node.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <main className="bg-black min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="border-2 border-purple-950 rounded-md h-[70vh] min-h-[400px] max-h-[700px] w-[50%] min-w-[400px] max-w-[500px] flex flex-col justify-evenly items-center">
        <Display state={state} />
        <CalcGrid dispatch={dispatch} />
      </div>
    </main>
  );
};

export default App;
