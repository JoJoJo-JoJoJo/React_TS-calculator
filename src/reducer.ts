import { Action, ActionType, State } from "./Types";

const initValue: State = {
  prevOperand: "",
  operator: "",
  currOperand: "0",
  bool: {
    overwrite: true,
    negative: {
      first: false,
      second: false,
    },
  },
};

const calculate = ({
  prevOperand,
  operator,
  currOperand,
  bool,
}: State): string => {
  const {
    negative: { first, second },
  } = bool;

  const prevNum = first ? -parseFloat(prevOperand) : parseFloat(prevOperand);
  const currNum = second ? -parseFloat(currOperand) : parseFloat(currOperand);

  // Edge case: If either of the values aren't a number, then simply clear the prevOperand.
  if (isNaN(prevNum) || isNaN(currNum)) return "";

  let ans: number = 0;
  switch (operator) {
    case "+":
      ans = prevNum + currNum;
      break;
    case "-":
      ans = prevNum - currNum;
      break;
    case "x":
    case "*":
      ans = prevNum * currNum;
      break;
    case "÷":
    case "/":
      ans = prevNum / currNum;
      break;
  }

  const minusToPos =
    prevNum < 0 && currNum < 0 && (operator === "x" || operator === "÷")
      ? ans * -1
      : ans;

  return minusToPos.toString().length > 7 ? ans.toFixed(7) : ans.toString();
};

function useReducerFn(state: State, action: Action): State {
  const { prevOperand, operator, currOperand, bool } = state;
  const { overwrite, negative } = bool;

  const { type, params } = action;

  let result: string;

  switch (type) {
    case ActionType.ADD_NUM:
      if (!params.char) return state;
      if (currOperand === "0" && params.char === ".")
        return {
          ...state,
          currOperand: `0${params.char}`,
          bool: {
            ...bool,
            overwrite: false,
          },
        };
      if (overwrite) {
        return {
          ...state,
          currOperand: params.char,
          bool: {
            ...bool,
            overwrite: false,
          },
        };
      }
      // Guard statement: Can't have more than one 0 preceding a number.
      if (params.char === "0" && currOperand === "0") return state;
      // Guard statement: Can't have more than one decimal point in a number.
      if (params.char === "." && currOperand.includes(".")) return state;
      return {
        ...state,
        currOperand: `${currOperand || ""}${params.char}`,
      };
    case ActionType.CHOOSE_OP:
      // Edge case: Both operands contain nothing, so nothing to operate on.
      if ((currOperand === "0" && prevOperand === "") || !params.op)
        return state;
      // Edge case: Negative operator just input, now changing the operator before that.
      if (currOperand === "" && prevOperand !== "" && negative.second) {
        return {
          ...state,
          operator: params.op,
          bool: {
            ...bool,
            negative: {
              ...negative,
              second: false,
            },
          },
        };
      }
      // Edge case: Operator just input, now inputting a second operator to change it.
      if (currOperand === "" && prevOperand !== "") {
        return {
          ...state,
          operator: params.op,
        };
      }
      // No previous calculations, so set the currOperand + operator into the prevOperand.
      if (prevOperand === "") {
        return {
          ...state,
          operator: params.op,
          prevOperand: currOperand,
          currOperand: "",
        };
      }
      // If performing a second calculation consecutively, calculate the answer to the previous expression first, and then add the new operator to the display.
      return {
        ...state,
        prevOperand: calculate(state),
        operator: params.op,
        currOperand: "",
      };
    case ActionType.SUBTRACT:
      // Edge case: Both operands contain nothing, so nothing to operate on.
      if ((currOperand === "0" && prevOperand === "") || !params.op)
        return state;
      // Edge case: Operator just input, now making second number negative.
      if (currOperand === "" && prevOperand !== "") {
        return {
          ...state,
          prevOperand: prevOperand,
          bool: {
            ...bool,
            negative: {
              ...negative,
              second: true,
            },
          },
        };
      }
      // Making first number negative.
      if (currOperand === "0" || overwrite) {
        return {
          ...state,
          bool: {
            ...bool,
            negative: {
              ...negative,
              first: true,
            },
          },
        };
      }
      // No previous calculations, so set the currOperand + operator into the prevOperand.
      if (prevOperand === "") {
        return {
          ...state,
          operator: params.op,
          prevOperand: currOperand,
          currOperand: "",
        };
      }
      // If performing a second calculation consecutively, calculate the answer to the previous expression first, and then add the new operator to the display.
      return {
        ...state,
        prevOperand: calculate(state),
        operator: params.op,
        currOperand: "",
      };
    case ActionType.AC:
      // Clear the display.
      return { ...initValue };
    case ActionType.CALC:
      if (prevOperand == "" || operator == "" || currOperand == "0") {
        return state;
      }
      result = calculate(state);
      return {
        ...state,
        prevOperand: "",
        operator: "",
        currOperand: result,
        bool: {
          overwrite: true,
          negative: {
            first: parseFloat(result) < 0 ? true : false,
            second: false,
          },
        },
      };
    default:
      return state;
  }
}

export { useReducerFn, initValue };
