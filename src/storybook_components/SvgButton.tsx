import { ExtendedProps } from "../assets/svgs/ExtendedProps";
import { DragControls } from "framer-motion";

interface SvgProps {
    className?: string,
    label: string,
    value?: string,
    svg: ExtendedProps,
    width?: string | number,
    height?: string | number,
    onClick?: (e?:any) => void,
    onMouseOver?: () => void,
    onMouseLeave?: () => void,
    type?: "button" | "submit" | "reset",
    color?: string, //1 path, whose "fill" attribute is set to "currentColor". These svgs are imported { ReactComponent as SvgName } from '' 
    face?: string, //2 or more paths; svgs are transformed via npx @svgr/cli and put in .tsx files, where they're bound to the type of a custom interface and return a JSX.Element
    faceshadow?: string,
    feature?: string,
    disabled?: boolean,
    dragControls?: DragControls
    //role: "navigation" | "modify" --> cambia lo schema colori, e si aggiunge l'hover e l'active
}

export default function SvgButton({className, label, value, svg, type, color = "text-on-surface", width = 24, height = 24, onClick, face = "#FFFBFE", faceshadow = "#EBE6EA", feature = "#1C1B1F", disabled = false, dragControls, onMouseLeave, onMouseOver} : SvgProps) {
    const Icon = svg as ExtendedProps;
        
    const strH = height.toString() + "px";
    const strW = width.toString() + "px";

        return(
            <button className={`w-12 h-12 flex items-center justify-center rounded-full ${className} ${disabled ? "text-disabled" : color}`} aria-label={label} value={value} onClick={onClick} type={type} onPointerDown={(event) => dragControls?.start(event)} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
                <Icon width={
                    typeof width === "number"
                        ? strW
                        : width
                    } height={typeof height === "number"
                        ? strH
                        : height
                    } face={face} faceshadow={faceshadow} feature={disabled ? "#D0C9D4" : feature}/>
            </button>
        )
    }

