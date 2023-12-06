import { ExtendedProps } from "../assets/svgs/ExtendedProps";
import SvgButton from "./SvgButton";

interface InputAreaProps {
  className?: string;
  label: "Search" | "Add" | "Set";
  inputType: "input" | "textarea";
  svg: ExtendedProps;
  value?: string;
  setValue?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  width?: string;
  maxHeight?: string;
}

export default function InputArea({
  className,
  label,
  inputType,
  svg,
  value,
  setValue,
  handleSubmit,
  width = "500px",
  maxHeight,
}: InputAreaProps) {
  return (
    <form
      className={`flex items-center justify-center gap-4 ${className}`}
      action=""
      onSubmit={handleSubmit}
      style={{ width: `${width}`, maxHeight: `${maxHeight}` }}
    >
      <label className="hidden" htmlFor="item">
        {label === "Search"
          ? "Type your search"
          : label === "Add"
          ? "Add new item or task"
          : "Set the title"}
      </label>
      {inputType === "textarea" ? (
        <textarea
          style={{ width: `${parseInt(width) - 64}px` }}
          className="autofill bg-transparent focus:bg-surface-container p-4 scrollbar resize-none focus:outline-none"
          id="item"
          name="item"
          value={value}
          onChange={setValue}
          placeholder={
            label === "Search"
              ? "Type your search"
              : label === "Add"
              ? "Add new item or task"
              : "Set the title"
          }
        />
      ) : (
        <input
          style={{ width: `${parseInt(width) - 64}px` }}
          className="autofill bg-transparent focus:bg-surface-container p-4 focus:outline-none active:bg-surface-container"
          type="text"
          id="item"
          name="item"
          value={value}
          onChange={setValue}
          placeholder={
            label === "Search"
              ? "Type your search"
              : label === "Add"
              ? "Add new item or task"
              : "Set the title"
          }
        />
      )}
      <SvgButton svg={svg} label={label} />
    </form>
  );
}
