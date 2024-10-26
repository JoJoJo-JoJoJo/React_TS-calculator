import { FunctionComponent, useReducer } from "react";
import Display from "./Display";
import CalcGrid from "./CalcGrid";
import { initValue, useReducerFn } from "./reducer";

const App: FunctionComponent = (): JSX.Element => {
  const [state, dispatch] = useReducer(useReducerFn, initValue);

  return (
    <main className="bg-black min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="border-2 border-purple-950 rounded-md h-[70vh] w-[50vw] flex flex-col justify-evenly items-center">
        <Display state={state} />
        <CalcGrid dispatch={dispatch} />
      </div>
    </main>
  );
};

export default App;
