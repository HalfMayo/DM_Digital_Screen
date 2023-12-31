import SvgButton from "../storybook_components/SvgButton";
import Tooltip from "../storybook_components/Tooltip";
import { ReactComponent as Conditions } from "../assets/svgs/burning-eye-svgrepo-com.svg";
import { ReactComponent as Skills } from "../assets/svgs/target-arrows-svgrepo-com.svg";
import Drawer from "../storybook_components/Drawer";
import Accordion from "../storybook_components/Accordion";
import useGetConditions from "./useGetConditions";
import useGetSkills from "./useGetSkills";
import { useState } from "react";

// TODO memoize this component, otherwise, since it's inside Fighter Provider, it will rerender everytime other unrelated stuff rerenders

export default function Sidebar() {
  const [isActive, setIsActive] = useState<string>("");
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const { conditions } = useGetConditions();
  const { skills } = useGetSkills();

  const toggleConditions = conditions?.map((el) => {
    return { id: el.id, title: el.name, propOne: el.description };
  });

  const toggleSkills = skills?.map((el) => {
    return {
      id: el.id,
      title: el.name,
      subtitle: el.skill,
      propOne: el.trained.toString(),
      propTwo: el.num_actions,
      propThree: el.requirements,
      propFour: el.description,
      propFive: el.crit_success,
      propSix: el.success,
      propSeven: el.failure,
      propEight: el.crit_failure,
      propNine: el.samples,
    };
  });

  toggleSkills?.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );

  function handleClick(value: string) {
    isOpen === value ? setIsOpen(null) : setIsOpen(value);
    isActive === value ? setIsActive("") : setIsActive(value);
  }

  return (
    <div className="relative flex gap-4 z-10 h-full">
      <Drawer>
        <Accordion
          className="max-h-screen overflow-y-auto scrollbar overflow-x-hidden transition-all duration-500 py-4"
          infos={isActive === "skills" ? toggleSkills : toggleConditions}
          width={isOpen ? "650px" : "0"}
          skills={isActive === "skills" ? true : false}
        />
      </Drawer>
      <div
        className={`absolute flex flex-col pl-8 h-full pt-8 gap-8 bg-white transition-all duration-500 ${
          isOpen
            ? "left-[650px] pr-8 shadow-[10px_3px_20px_-15px_rgba(0,0,0,0.3)] rounded-lg"
            : "left-0"
        }`}
      >
        <Tooltip title="Conditions" side="left">
          <SvgButton
            onClick={(e) => handleClick(e.currentTarget.value)}
            className={`${
              isActive === "conditions"
                ? "bg-secondary-container text-on-secondary-container drop-shadow-md"
                : "drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            }`}
            svg={Conditions}
            label="open conditions"
            value="conditions"
          />
        </Tooltip>
        <Tooltip title="Skills" side="left">
          <SvgButton
            onClick={(e) => handleClick(e.currentTarget.value)}
            className={`${
              isActive === "skills"
                ? "bg-secondary-container text-on-secondary-container drop-shadow-md"
                : "drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"
            }`}
            svg={Skills}
            label="open skills"
            value="skills"
          />
        </Tooltip>
      </div>
    </div>
  );
}
