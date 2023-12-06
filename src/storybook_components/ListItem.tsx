import { ReactComponent as Handler } from "../assets/svgs/drag-vertical-svgrepo-com.svg";
import { ReactComponent as Edit } from "../assets/svgs/write-svgrepo-com.svg";
import { ReactComponent as Delete } from "../assets/svgs/bin-delete-recycle-svgrepo-com.svg";
import { ReactComponent as Dots } from "../assets/svgs/dots-3-horizontal-svgrepo-com.svg";
import { ReactComponent as Plus } from "../assets/svgs/plus-svgrepo-com.svg";
import { Reorder, useDragControls, motion } from "framer-motion";
import Checkbox from "./Checkbox";
import SvgButton from "./SvgButton";
import InputArea from "./InputArea";

interface Props {
  item: string;
  show?: string | null;
  editButtons?: any;
  editMode?: string | null;
  onClick?: () => void;
  onActivate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  itemToEdit?: string;
  setItemToEdit?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  changeItem?: (e: React.FormEvent<HTMLFormElement>) => void;
  checked?: boolean;
  readonly?: boolean;
  editInterface?: boolean;
}

export default function ListItem({
  item,
  show,
  editButtons,
  editMode,
  onClick,
  onActivate,
  onEdit,
  onDelete,
  itemToEdit,
  setItemToEdit,
  changeItem,
  checked,
  readonly,
  editInterface = false,
}: Props) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={editInterface ? false : true}
      dragControls={dragControls}
    >
      <motion.div
        className="flex items-center justify-between w-96 h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
      >
        <div className={`relative flex items-center justify-start w-full`}>
          {editInterface && item !== editMode ? (
            <SvgButton
              label="Drag Item"
              svg={Handler}
              dragControls={dragControls}
            />
          ) : (
            <></>
          )}
          {editInterface && item === show ? (
            <div
              ref={editButtons}
              className="absolute w-full h-full z-10 bg-surface-container opacity-90 flex items-center justify-center"
            >
              <SvgButton label="Edit" svg={Edit} onClick={onEdit} />
              <SvgButton label="Delete" svg={Delete} onClick={onDelete} />
            </div>
          ) : (
            <></>
          )}
          {item === editMode ? (
            <InputArea
              className="bg-surface-container"
              label="Add"
              inputType="textarea"
              svg={Plus}
              width="384px"
              maxHeight="80px"
              value={itemToEdit}
              setValue={setItemToEdit}
              handleSubmit={changeItem}
            />
          ) : (
            <Checkbox
              className="w-[272px]"
              value={item}
              onClick={onClick}
              checked={checked}
              readonly={readonly}
            />
          )}
        </div>
        {editInterface && item !== show && item !== editMode ? (
          <div className={item === show ? "bg-surface" : ""}>
            <SvgButton
              label="Options"
              svg={Dots}
              onClick={editMode ? undefined : onActivate}
            />
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </Reorder.Item>
  );
}
