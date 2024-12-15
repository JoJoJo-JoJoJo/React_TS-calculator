interface State {
  prevOperand: string;
  operator: string;
  currOperand: string;
  bool: {
    overwrite: boolean;
    negative: {
      first: boolean;
      second: boolean;
    };
  };
}

enum ActionType {
  ADD_NUM = "add-num",
  CHOOSE_OP = "choose-op",
  SUBTRACT = "subtract",
  AC = "ac",
  CALC = "calc",
}

interface Action {
  type: ActionType;
  params: {
    char?: string;
    op?: string;
  };
}

type Reducer = {
  reducer: (state: State, action: Action) => State;
  initValue: object;
};

type DispatchFn = React.Dispatch<Action>;

export type { State, Action, Reducer, DispatchFn };
export { ActionType };
