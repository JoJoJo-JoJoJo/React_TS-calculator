import Button from "./Button.tsx";
import { btns } from "./BtnContext.ts";

const CalcGrid = () => {
  return (
    <div
      id="calc-grid"
      className="w-[95%] h-[75%] border-2 border-gray-900 grid grid-cols-4 grid-rows-5 gap-2 rounded-md p-2.5"
    >
      {btns.map((btn, i) => (
        <Button id={btn.id} text={btn.text} key={`${btn.id}_${i}`} />
      ))}
    </div>
  );
}

export default CalcGrid
