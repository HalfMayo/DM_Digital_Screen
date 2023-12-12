import { useState, useEffect, useRef } from "react";
import Toggle from "./Toggle";
import { ToggleProps } from "../interfaces/InfoProps";
import ToggleSkill from "./ToggleSkill";

export interface AccordionProps {
  infos: ToggleProps[] | undefined;
  width?: string;
  upperState?: number | null;
  upperSetState?: (i: number) => void;
  compressed?: boolean;
  className?: string;
  skills?: boolean;
}

export default function Accordion({
  infos,
  width = "600px",
  upperState,
  upperSetState,
  compressed = false,
  className,
  skills = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const click = useRef<any>(null);

  function toggleText(i: number) {
    isOpen === i ? setIsOpen(null) : setIsOpen(i);
  }

  function clickOutside(e: any) {
    if (click.current && !click.current.contains(e.target)) {
      setIsOpen(null);
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <ul className={className} ref={click} style={{ width: `${width}` }}>
      {infos &&
        !skills &&
        infos.map((info, i) => (
          <Toggle
            key={i}
            info={info}
            i={i}
            isOpen={typeof upperState === "undefined" ? isOpen : upperState}
            onClick={upperSetState ? upperSetState : toggleText}
            className={
              isOpen === i || i === infos.length - 1
                ? ""
                : "border-b border-surface-low"
            }
            width={width}
            compressed={compressed}
          />
        ))}
      {infos &&
        skills &&
        infos.map((info, i) => (
          <ToggleSkill
            key={i}
            info={info}
            i={i}
            isOpen={typeof upperState === "undefined" ? isOpen : upperState}
            onClick={upperSetState ? upperSetState : toggleText}
            className={
              isOpen === i || i === infos.length - 1
                ? ""
                : "border-b border-surface-low"
            }
            width={width}
            compressed={compressed}
          />
        ))}
    </ul>
  );
}
