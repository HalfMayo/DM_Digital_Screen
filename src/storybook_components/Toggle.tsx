import { ToggleProps } from "../interfaces/InfoProps";
import { ReactComponent as Arrow } from "../assets/svgs/right-chevron-svgrepo-com.svg";

interface ToggleElProps {
  info: ToggleProps;
  isOpen: number | null;
  i: number;
  onClick: (i: number) => void;
  className?: string;
  width?: string;
  compressed?: boolean;
}

export default function Toggle({
  info,
  isOpen,
  i,
  onClick,
  className,
  width = "500px",
  compressed = false,
}: ToggleElProps) {
  return (
    <li className="list-none" style={{ width: `${width}` }}>
      <div
        aria-label={isOpen === i ? "Hide" : "Show"}
        onClick={() => onClick(i)}
        className={`p-4 bg-white text-base m-0 flex items-center justify-between gap-4 w-full ${className}`}
      >
        <div className="w-full flex gap-4" key="title">
          <img
            className={`object-cover w-14 h-14 ${info.img ? "" : "hidden"}`}
            src={info.img}
          />
          <div
            className="flex flex-col items-start justify-center"
            style={{ width: `${parseInt(width) - 144}px` }}
          >
            <h3 className="overflow-hidden text-left brief-title pl-4">
              {info.title}
            </h3>
            <p
              className={`text-sm overflow-hidden text-left brief-subtitle ${
                info.subtitle ? "" : "hidden"
              }`}
            >
              {info.subtitle}
            </p>
          </div>
        </div>
        <Arrow
          width="24px"
          height="24px"
          className={`${
            isOpen === i
              ? "rotate-90 origin-[50%_50%] transition-all duration-700"
              : "rotate-0 origin-[50%_50%] transition-all duration-500"
          }`}
        />
      </div>
      <div
        className={`bg-surface overflow-hidden transition-[max-height] ease-linear ${
          isOpen === i
            ? "max-h-[1000px] duration-[1500ms]"
            : "max-h-0 duration-1000"
        }`}
      >
        <div className="px-8 py-4">
          <div
            className={compressed ? "max-h-40 overflow-y-scroll scrollbar" : ""}
          >
            <p className={`${info.propOne ? "" : "hidden"}`}>{info.propOne}</p>
            <p className={`${info.propTwo ? "" : "hidden"}`}>{info.propTwo}</p>
            <p className={`${info.propThree ? "" : "hidden"}`}>
              {info.propThree}
            </p>
            <p className={`${info.propFour ? "" : "hidden"}`}>
              {info.propFour}
            </p>
            <p className={`${info.propFive ? "" : "hidden"}`}>
              {info.propFive}
            </p>
            <p className={`${info.propSix ? "" : "hidden"}`}>{info.propSix}</p>
            <p className={`${info.propSeven ? "" : "hidden"}`}>
              {info.propSeven}
            </p>
            <p className={`${info.propEight ? "" : "hidden"}`}>
              {info.propEight}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
