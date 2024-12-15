import { ActionType, DispatchFn } from "./Types";

const handleKeyInput = (e: KeyboardEvent, dispatch: DispatchFn) => {
  e.preventDefault();

  switch (e.key) {
    case "Backspace": //!
      dispatch({ type: ActionType.AC, params: {} });
      break;
    case "=":
    case "Enter":
      dispatch({ type: ActionType.CALC, params: {} });
      break;
    case ".":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      dispatch({ type: ActionType.ADD_NUM, params: { char: e.key } });
      break;
    case "-":
      dispatch({ type: ActionType.SUBTRACT, params: { op: e.key } });
      break;
    case "+":
    case "*":
    case "/":
      dispatch({ type: ActionType.CHOOSE_OP, params: { op: e.key } });
      break;
  }
};

export default handleKeyInput;
