import { useContext } from "react";
import clsx from "clsx";
import BtnContext from "./BtnContext";

interface BtnProps {
  id: string;
  text: string;
}

type OnClick = {
  (btnId: string, btnText: string): void;
};

const Button = ({ id, text }: BtnProps) => {
  const onClick: OnClick = useContext(BtnContext);

  return (
    <button
      id={id}
      onClick={() => onClick(id, text)}
      className={clsx(
        "btn text-center text-purple-200 text-4xl font-mono cursor-pointer",
        {
          "row-span-2 col-span-1 row-start-4 col-start-4 bg-blue-950 text-black":
            id === "equals",
          "row-span-2 col-span-1 row-start-2 col-start-4": id === "add",
          "row-start-1 col-start-1 bg-red-500 text-black": id === "clear",
          "col-span-2 row-span-1 col-start-1 row-start-5": id === "zero",
          "row-start-5 col-start-3": id === "decimal",
        }
      )}
    >
      {text}
    </button>
  );
};

export default Button;
