import { InitInfo, useFighters } from "../contexts/FightersContext"
import { ReactComponent as Magnifying } from '../assets/svgs/magnifying-glass-svgrepo-com.svg'
import { ReactComponent as Edit } from '../assets/svgs/write-svgrepo-com.svg'
import { ReactComponent as Confirm } from '../assets/svgs/tick-circle-svgrepo-com.svg'
import SvgButton from "../storybook_components/SvgButton"

interface InitProps {
    init: InitInfo,
    i: number
}

export default function InitiativeStep({init, i}:InitProps) {

    const{index, openEdit, dispatch, friends} = useFighters()

    return(
        <div className="flex flex-col gap-4 items-center">
                                    <li className="flex flex-col items-center justify-center gap-4 cursor-pointer relative z-1 w-[140px]">
                                        <p>{init.name}</p>
                                        {openEdit === init.name
                                            ? <input className="flex items-center justify-center text-center rounded-full w-8 h-8" value={init.initiative} onChange={(e) => dispatch({type: "update", payload:{state:{faction: init.faction, name: init.name, initiative: e.target.value, conditions: init.conditions}, index: i}})}></input>
                                            : <div
                                                className={`flex items-center justify-center text-center rounded-full w-8 h-8 ${index >= i.toString()
                                                    ? "bg-primary text-white"
                                                    : "bg-disabled text-on-surface"}
                                                    `}
                                                    onClick={() => dispatch({type: "nextStep", payload: init.name})}>{init.initiative}</div>
                                        }
                                        <textarea className="rounded-sm bg-surface-container resize-none p-2 w-24 text-xs scrollbar focus:outline-none" value={init.conditions} onChange={(e) => dispatch({type: "update", payload:{state:{faction: init.faction, name: init.name, initiative: init.initiative, conditions: e.target.value}, index: i}})}></textarea>
                                    </li>
                                    <div className="flex gap-2">
                                        {openEdit === init.name
                                            ? <SvgButton label="submit" onClick={() => dispatch({type: "changeOrder"})} svg={Confirm} color="text-on-primary"/>
                                            : <SvgButton label="change initiative" onClick={() => dispatch({type: "editInterface", payload: init.name})} svg={Edit} color="text-on-surface"/>
                                        }
                                        {!friends.includes(init.name) && <SvgButton width="32" height="32" color="text-on-surface" label="Check info" svg={Magnifying} onClick={() => dispatch({type: "openInfo", payload: init.name})}/>}
                                    </div>
                                </div>
    )
}