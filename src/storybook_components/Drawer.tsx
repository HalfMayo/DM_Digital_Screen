import { ChildrenProps } from "../interfaces/ChildrenProps";

export default function Drawer({ children }: ChildrenProps) {
  return <div className="absolute bg-white">{children}</div>;
}
