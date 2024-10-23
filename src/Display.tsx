interface DisplayProps {
  displayText: string;
  value: string;
}

const Display = ({ displayText, value }: DisplayProps) => {
  return (
    <div className="w-[95%] h-[20%] border-2 border-gray-900 p-2 relative">
      <p className="text-yellow-500 absolute top-2 right-5 text-xl">{displayText}</p>
      <p
        id="display"
        className="text-white absolute bottom-4 right-5 text-5xl appearance-none"
      >{value}</p>
    </div>
  );
};

export default Display;
