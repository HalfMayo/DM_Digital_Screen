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

export default function ToggleSkill({
  info,
  isOpen,
  i,
  onClick,
  className,
  width = "500px",
  compressed = false,
}: ToggleElProps) {
  const skillsList = info.subtitle?.split(", ");
  const samplesList = info.propNine?.split("; ");

  return (
    <li className="list-none" style={{ width: `${width}` }}>
      <div
        aria-label={isOpen === i ? "Hide" : "Show"}
        onClick={() => onClick(i)}
        className={`p-4 bg-white text-base m-0 flex items-center justify-between w-full ${className}`}
      >
        <div className="w-1/2 flex gap-4" key="title">
          <img
            className={`object-cover w-14 h-14 ${info.img ? "" : "hidden"}`}
            src={info.img}
          />
          <h3 className="text-left pl-4 font-bold">{info.title}</h3>
        </div>
        <div className="flex items-center justify-start w-full gap-4">
          <div className="flex items-center justify-end w-full flex-wrap gap-2">
            {skillsList?.map((el) => (
              <p
                key={el}
                className="text-sm font-semibold px-2 py-1 bg-tertiary-container text-on-surface rounded-md"
              >
                {el}
              </p>
            ))}
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
      </div>
      <div
        className={`bg-surface overflow-hidden transition-[max-height] ease-linear ${
          isOpen === i
            ? "max-h-[1500px] duration-[1500ms]"
            : "max-h-0 duration-1000"
        }`}
      >
        <div className="px-8 py-4">
          <div
            className={compressed ? "max-h-40 overflow-y-scroll scrollbar" : ""}
          >
            <p>
              <span className="font-semibold">Trained? </span>
              {info.propOne === "true" ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Number of actions: </span>
              {info.propTwo ? info.propTwo : "-"}
            </p>
            <p>
              <span className="font-semibold">Requirements: </span>
              {info.propThree ? info.propThree : "-"}
            </p>
            {info.propFour && <p className="mt-4">{info.propFour}</p>}
            <div className="mt-4">
              {info.propFive && (
                <p>
                  <span className="font-semibold">Critical Success: </span>
                  {info.propFive}
                </p>
              )}
              {info.propSix && (
                <p>
                  <span className="font-semibold">Success: </span>
                  {info.propSix}
                </p>
              )}
              {info.propSeven && (
                <p>
                  <span className="font-semibold">Failure: </span>
                  {info.propSeven}
                </p>
              )}
              {info.propEight && (
                <p>
                  <span className="font-semibold">Critical Failure: </span>
                  {info.propEight}
                </p>
              )}
              {info.propNine && (
                <div className="mt-4">
                  {samplesList?.map((el, i) => (
                    <p key={i}>
                      <span className="font-semibold">
                        {el.split(" ").splice(0, 1)}
                      </span>{" "}
                      {el.split(" ").splice(1).join(" ")}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
