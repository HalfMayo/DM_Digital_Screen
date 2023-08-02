import SvgButton from "../storybook_components/SvgButton";
import Tooltip from "../storybook_components/Tooltip";
import { ReactComponent as Conditions } from '../assets/svgs/burning-eye-svgrepo-com.svg'
import { ReactComponent as Skills } from '../assets/svgs/target-arrows-svgrepo-com.svg'
import Drawer from "../storybook_components/Drawer";
import { useRules } from "../contexts/RulesContext";
import Accordion from "../storybook_components/Accordion";

export default function Sidebar() {

    const {drawerContent, isActive, isOpen, dispatch, getInfo} = useRules();

    function handleClick(value:string) {
        getInfo(value);
        dispatch({type:"toggleDrawer", payload: value});
    }

    return(
        <div className="relative flex gap-4 z-10 h-full">
            <Drawer>
                {drawerContent && <Accordion className="max-h-screen overflow-y-auto scrollbar p-4" infos={drawerContent} width="100%" />}
            </Drawer>
            <div className={`absolute flex flex-col pl-8 h-full pt-8 gap-8 bg-white transition-all duration-500 ${isOpen ? "left-[650px] pr-8 shadow-[10px_3px_20px_-15px_rgba(0,0,0,0.3)] rounded-lg": "left-0"}`}>
                <Tooltip title="Conditions" side="left">
                    <SvgButton onClick={(e) => handleClick(e.currentTarget.value)} className={`${isActive === "conditions" ? "bg-secondary-container text-on-secondary-container drop-shadow-md" : "drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"}`} svg={Conditions} label="open conditions" value="conditions"/>
                </Tooltip>
                <Tooltip title="Skills" side="left">
                    <SvgButton onClick={(e) => handleClick(e.currentTarget.value)} className={`${isActive === "skills" ? "bg-secondary-container text-on-secondary-container drop-shadow-md" : "drop-shadow-md bg-white hover:bg-secondary-container hover:text-on-secondary-container hover:drop-shadow-md"}`} svg={Skills} label="open skills" value="skills" />
                </Tooltip>
            </div>
        </div>
    )
}