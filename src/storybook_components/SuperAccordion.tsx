import {useState} from 'react'
import { ToggleProps, AccordionElProps } from "../interfaces/InfoProps";
import Toggle from './Toggle';
import SuperToggle from './SuperToggle';

interface SuperAccordionProps {
    infos: (ToggleProps | AccordionElProps)[],
    width?: string,
    compressed?: boolean,
    className?: string
}

export default function SuperAccordion({infos, width = "600px", compressed = false, className}: SuperAccordionProps) {

    const [isReallyOpen, setIsReallyOpen] = useState<number|null>(null);

    function toggleRealText(i:number) {
        isReallyOpen === i ? setIsReallyOpen(null) : setIsReallyOpen(i);
    }

    function isToggle(el: ToggleProps | AccordionElProps): el is ToggleProps {
        return typeof (el as ToggleProps).propOne === "string"
    }

    return(
        <ul className={className} style={{width: `${width}`}}>
            {
                infos.map((info, i) =>
                    isToggle(info)
                    ? <Toggle
                        key={i}
                        info={info}
                        i={i}
                        isOpen={isReallyOpen}
                        onClick={toggleRealText}
                        className={isReallyOpen === i || i === infos.length - 1 ? "" : "border-b border-surface-low"}
                        width="100%"
                        compressed={compressed}
                        />
                    : <SuperToggle key={i}
                        info={info}
                        i={i}
                        isOpen={isReallyOpen}
                        onClick={toggleRealText}
                        className={i === infos.length - 1 ? "" : "border-b border-surface-low"}
                        width="100%"
                        />
                )
            }
        </ul>
    )
}