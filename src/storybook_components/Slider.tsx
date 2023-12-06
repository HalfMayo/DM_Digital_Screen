import { ReactComponent as Lock } from "../assets/svgs/lock-svgrepo-com.svg";
import { ReactComponent as Unlock } from "../assets/svgs/lock-open-svgrepo-com.svg";
import { useState, useRef, useEffect } from "react";
import SliderProps from "../interfaces/SliderProps";

export default function Slider({
  min,
  max,
  lockable = false,
  label,
  value,
  onChange,
}: SliderProps) {
  const [locked, setLocked] = useState(false);
  const inputRef: any = useRef(null);
  const outputRef: any = useRef(null);

  useEffect(() => {
    const currentPerc =
      ((inputRef.current.value - inputRef.current.min) /
        (inputRef.current.max - inputRef.current.min)) *
      100;
    inputRef.current.style.background =
      "linear-gradient(to right, #006973 " +
      currentPerc +
      "%, #F5F0F4 " +
      currentPerc +
      "%)";
    outputRef.current.style.left = `calc(${currentPerc}% + (${
      8 - currentPerc * 0.15
    }px))`;
    outputRef.current.style.transform = `translateX(${
      -40 - currentPerc * 0.2
    }%)`;

    locked
      ? (inputRef.current.style.background =
          "linear-gradient(to right, #D0C9D4 " +
          currentPerc +
          "%, #F5F0F4 " +
          currentPerc +
          "%)")
      : (inputRef.current.style.background =
          "linear-gradient(to right, #006973 " +
          currentPerc +
          "%, #F5F0F4 " +
          currentPerc +
          "%)");
  }, [value, inputRef, outputRef, locked]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center m-8 gap-4">
        <label htmlFor={label}>{label}:</label>
        <div className="relative">
          <input
            className="thumb-web thumb-moz appearance-none bg-gradient-to-r from-primary-teal to-surface-high to-50% cursor-pointer w-52 h-1.5 rounded-lg"
            ref={inputRef}
            type="range"
            min={min.toString()}
            max={max.toString()}
            value={value.toString()}
            onChange={onChange}
            id={label}
            name={label}
            disabled={lockable && locked ? true : false}
          ></input>

          <output
            ref={outputRef}
            className={`absolute -top-full left-2/4 px-2 py-px rounded-full
                    ${
                      lockable && locked
                        ? "bubble-disabled text-on-surface bg-surface-low"
                        : "bubble text-on-primary bg-primary-teal"
                    }`}
          >
            <span>{value}</span>
          </output>
        </div>
      </div>
      {lockable ? (
        <button onClick={() => setLocked((prev) => !prev)}>
          {locked ? <Unlock /> : <Lock />}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
