import { useRules } from "../contexts/RulesContext";
import { ChildrenProps } from "../interfaces/ChildrenProps";

export default function Drawer({children} : ChildrenProps) {

    const {isOpen} = useRules()

    return(
        <div className={`absolute bg-white transition-[width] duration-500 ${isOpen ? "w-[650px]" : "w-0"}`}>
            {children}
        </div>
    )
}