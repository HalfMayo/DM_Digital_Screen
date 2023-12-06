import { ChildrenProps } from "../interfaces/ChildrenProps";

export default function Drawer({ children }: ChildrenProps) {
  return (
    <div className={`absolute bg-white transition-[width] duration-500`}>
      {children}
    </div>
  );
}
