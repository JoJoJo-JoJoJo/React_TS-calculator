import { State } from "./Types.ts";

const Display = ({ state }: { state: State }): JSX.Element => {
  const { prevOperand, operator, currOperand, bool } = state;

  return (
    <div className="w-[95%] h-[20%] border-2 border-gray-900 p-2 relative">
      <div
        aria-label="previous-operand"
        className="text-yellow-500 absolute top-2 right-5 text-xl"
      >
        {prevOperand} {operator} {bool.negative.second ? "-" : ""}
      </div>
      <div
        aria-label="current-operand"
        id="display"
        className="text-white absolute bottom-4 right-5 text-5xl appearance-none"
      >
        {currOperand}
      </div>
    </div>
  );
}

export default Display
