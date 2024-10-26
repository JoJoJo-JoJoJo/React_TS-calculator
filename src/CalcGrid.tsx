import { Dispatch } from "react";
import { NumBtn, OpBtn } from "./Buttons.tsx";
import { Action, ActionType } from "./Types.ts";

interface Props {
  dispatch: Dispatch<Action>;
}

const CalcGrid = ({ dispatch }: Props) => {
  return (
    <div
      id="calc-grid"
      className="w-[95%] h-[75%] border-2 border-gray-900 grid grid-cols-4 grid-rows-5 gap-2 rounded-md p-2.5"
    >
      <button
        id="clear"
        className="btn text-center text-4xl font-mono cursor-pointer row-start-1 col-start-1 bg-red-500 text-black"
        onClick={() => dispatch({ type: ActionType.AC, params: {} })}
      >
        AC
      </button>
      <button
        id="equals"
        className="btn text-center text-4xl font-mono cursor-pointer row-span-2 col-span-1 row-start-4 col-start-4 bg-blue-950 text-black"
        onClick={() => dispatch({ type: ActionType.CALC, params: {} })}
      >
        =
      </button>
      <OpBtn dispatch={dispatch} op="÷" id="divide" />
      <OpBtn dispatch={dispatch} op="x" id="multiply" />
      <OpBtn dispatch={dispatch} op="-" id="subtract" />
      <OpBtn dispatch={dispatch} op="+" id="add" />
      <NumBtn dispatch={dispatch} char="0" id="zero" />
      <NumBtn dispatch={dispatch} char="1" id="one" />
      <NumBtn dispatch={dispatch} char="2" id="two" />
      <NumBtn dispatch={dispatch} char="3" id="three" />
      <NumBtn dispatch={dispatch} char="4" id="four" />
      <NumBtn dispatch={dispatch} char="5" id="five" />
      <NumBtn dispatch={dispatch} char="6" id="six" />
      <NumBtn dispatch={dispatch} char="7" id="seven" />
      <NumBtn dispatch={dispatch} char="8" id="eight" />
      <NumBtn dispatch={dispatch} char="9" id="nine" />
      <NumBtn dispatch={dispatch} char="." id="decimal" />
    </div>
  );
};

export default CalcGrid;
