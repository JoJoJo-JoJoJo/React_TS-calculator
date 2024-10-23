import { useEffect, useState } from "react";
import Display from "./Display.tsx";
import CalcGrid from "./CalcGrid.tsx";
import BtnContext, { btns } from "./BtnContext.ts";

const App = () => {
  const [displayText, setDisplayText] = useState<string>("");
  const [value, setValue] = useState<string>("0");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      let currKeyText: string;

      switch (e.key) {
        case "Enter":
          currKeyText = "equals";
          break;
        case "*":
          currKeyText = "x";
          break;
        case "/":
          currKeyText = "÷";
          break;
        default:
          // If 'e.key' is equal to 'btn.text' (i.e. all numbers, decimal, + and -).
          currKeyText = e.key;
          break;
      }

      const currKey = btns.filter((btn) => btn.text === currKeyText)[0];

      handleClick(currKey.id, currKeyText);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculate = (): number => {
    const elArr: string[] = [...displayText.split(" ")];

    const intFloatCheck = (item: string): number => {
      return !Number.isInteger(item) ? parseFloat(item) : parseInt(item);
    };

    let value: number;

    const answer: number = elArr.reduce((prevVal, currVal, i): number => {
      if (i % 2 === 1) {
        const firstNum = intFloatCheck(elArr[i - 1]);
        const secondNum = intFloatCheck(elArr[i + 1]);

        switch (currVal) {
          case "÷":
            value = firstNum / secondNum;
            break;
          case "x":
            value = firstNum * secondNum;
            break;
          case "+":
            value = firstNum + secondNum;
            break;
          case "-":
            value = firstNum - secondNum;
            break;
        }
      } else {
        value = 0;
      }

      return prevVal + value;
    }, 0);

    return answer;
  };

  let answer: number | string;

  const handleClick = (btnId: string, btnText: string): void => {
    switch (btnId.toLowerCase()) {
      case "clear":
        setDisplayText("");
        setValue("0");
        break;
      case "equals":
        answer = calculate();
        answer = answer.toString().match(/.(\d{5,})/g)
          ? answer.toFixed(4)
          : answer.toString();
        setDisplayText((prev) => prev + " = " + answer);
        setValue(answer);
        break;
      case "decimal":
        if (value === "0") {
          setValue("0.");
          break;
        }
        setValue((prev) => prev + ".");
        setDisplayText((prev) => prev + ".");
        break;
      case "zero":
        if (value === "0") return;
        setValue((prev) => prev + "0");
        setDisplayText((prev) => prev + "0");
        break;
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        if (value === "0" || value.match(/^([+\-x÷])$/g)) {
          setValue(btnText);
        } else {
          setValue((prev) => prev + btnText);
        }
        setDisplayText((prev) => prev + btnText);
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        if (displayText.match(/([+\-x÷]\s)$/g)) {
          setDisplayText((prev) => prev.slice(0, -2) + ` ${btnText} `);
        } else if (displayText.match(/=/g)) {
          setDisplayText(`${value} ${btnText} `);
        } else {
          setDisplayText((prev) => prev + ` ${btnText} `);
        }
        setValue(btnText);
        break;
    }
  };

  return (
    <main className="bg-black min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="border-2 border-purple-950 rounded-md h-[70vh] w-[50vw] flex flex-col justify-evenly items-center">
        <Display displayText={displayText} value={value} />
        <BtnContext.Provider value={handleClick}>
          <CalcGrid />
        </BtnContext.Provider>
      </div>
    </main>
  );
};

export default App;
