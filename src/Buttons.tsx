import clsx from "clsx";
import { ActionType, Action } from "./Types.ts";
import { Dispatch } from "react";

interface NumBtnProps {
  dispatch: Dispatch<Action>;
  char: string;
  id: string;
}

interface OpBtnProps {
  dispatch: Dispatch<Action>;
  op: string;
  id: string;
}

const OpBtn = ({ dispatch, op, id }: OpBtnProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "btn text-center text-purple-200 text-4xl font-mono cursor-pointer",
        {
          "row-span-2 col-span-1 row-start-2 col-start-4": id === "add",
        }
      )}
      onClick={() => {
        if (id === "subtract") {
          dispatch({ type: ActionType.SUBTRACT, params: { op } });
        } else {
          dispatch({ type: ActionType.CHOOSE_OP, params: { op } });
        }
      }}
    >
      {op}
    </button>
  );
};

const NumBtn = ({ dispatch, char, id }: NumBtnProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "btn text-center text-purple-200 text-4xl font-mono cursor-pointer",
        {
          "col-span-2 row-span-1 col-start-1 row-start-5": id === "zero",
          "row-start-5 col-start-3": id === "decimal",
        }
      )}
      onClick={() => dispatch({ type: ActionType.ADD_NUM, params: { char } })}
    >
      {char}
    </button>
  );
};

export { NumBtn, OpBtn };
