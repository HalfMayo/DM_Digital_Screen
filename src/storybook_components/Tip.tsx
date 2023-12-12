import { ReactNode } from "react";

interface TipProps {
  children: ReactNode;
}

export default function Tip({ children }: TipProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full bg-secondary-container text-on-secondary-container py-2 px-4 rounded-md">
      {children}
    </div>
  );
}
