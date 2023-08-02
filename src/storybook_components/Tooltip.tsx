import { ChildrenProps } from "../interfaces/ChildrenProps"

interface TooltipProps extends ChildrenProps {
    title: string,
    side: "top" | "bottom" | "left" | "right"
}

export default function Tooltip({children, title, side} : TooltipProps) {
    return(
        <div className="relative group">
            {children}
            <span className={`
            ${side === "left"
                ? "top-[50%] translate-y-[-50%] left-14"
                : "left-[50%] translate-x-[-50%] top-14"}
            absolute invisible bg-surface-container px-2 py-1.5 rounded-md group-hover:visible`}>{title}</span>
        </div>
    )
}