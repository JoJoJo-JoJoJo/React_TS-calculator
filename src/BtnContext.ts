import { createContext } from "react";

const BtnContext = createContext((btnId: string, btnText: string): void => {
  throw new ReferenceError("There is no value provided for 'BtnContext'. The button Id is: " + btnId + `=> ${btnText}`);
});

const btns = [
  {
    id: "add",
    text: "+",
  },
  {
    id: "divide",
    text: "÷",
  },
  {
    id: "multiply",
    text: "x",
  },
  {
    id: "subtract",
    text: "-",
  },
  {
    id: "equals",
    text: "=",
  },
  {
    id: "decimal",
    text: ".",
  },
  {
    id: "clear",
    text: "AC",
  },
  {
    id: "zero",
    text: "0",
  },
  {
    id: "one",
    text: "1",
  },
  {
    id: "two",
    text: "2",
  },
  {
    id: "three",
    text: "3",
  },
  {
    id: "four",
    text: "4",
  },
  {
    id: "five",
    text: "5",
  },
  {
    id: "six",
    text: "6",
  },
  {
    id: "seven",
    text: "7",
  },
  {
    id: "eight",
    text: "8",
  },
  {
    id: "nine",
    text: "9",
  },
];

export default BtnContext;
export { btns };