import {SkillsProps, ToggleProps} from "../interfaces/InfoProps"
import { ReactComponent as Arrow } from '../assets/svgs/right-chevron-svgrepo-com.svg'

interface ToggleElProps {
    info: ToggleProps | SkillsProps;
    isOpen: number | null,
    i: number;
    onClick: (i:number) => void,
    className?: string,
    width?: string,
    compressed?: boolean
}

export default function Toggle({info, isOpen, i, onClick, className, width = "500px", compressed = false} : ToggleElProps) {

    function isToggle(el: ToggleProps | SkillsProps): el is ToggleProps {
        return typeof (el as ToggleProps).propOne === "string"
    }

    return(
        <li className="list-none" style={{width: `${width}`}}>
            <div aria-label={isOpen === i ? "Hide" : "Show"} onClick={() => onClick(i)} className={`p-4 bg-white text-base m-0 flex items-center justify-between gap-4 w-full ${className}`}>
                <div className="w-full flex gap-4" key="title">
                        <img className={`object-cover w-14 h-14 ${info.img ? "" : "hidden"}`} src={info.img}/>
                        <div  className="flex flex-col items-start justify-center" style={{width: `${parseInt(width)-144}px`}}>
                            <h3 className="overflow-hidden text-left brief-title">{info.title}</h3>
                            <p className={`text-sm overflow-hidden text-left brief-subtitle ${info.subtitle ? "" : "hidden"}`}>{info.subtitle}</p>
                        </div>
                </div>
                <Arrow width="24px" height="24px" className={`${isOpen === i ? "rotate-90 origin-[50%_50%] transition-all duration-700" : "rotate-0 origin-[50%_50%] transition-all duration-500"}`}/>
            </div>
            <div className={`bg-surface overflow-hidden transition-[max-height] ease-linear ${isOpen === i ? "max-h-[1000px] duration-[1500ms]" : "max-h-0 duration-1000"}`}>
                <div className="p-4"> 
                        {isToggle(info) 
                            ?
                            <div className={compressed ? "max-h-40 overflow-y-scroll scrollbar": ""}>
                                <p className={`${info.propOne ? "" : "hidden"}`}>{info.propOne}</p>
                                <p className={`${info.propTwo ? "" : "hidden"}`}>{info.propTwo}</p>
                                <p className={`${info.propThree ? "" : "hidden"}`}>{info.propThree}</p>
                                <p className={`${info.propFour ? "" : "hidden"}`}>{info.propFour}</p>
                                <p className={`${info.propFive ? "" : "hidden"}`}>{info.propFive}</p>
                                <p className={`${info.propSix ? "" : "hidden"}`}>{info.propSix}</p>
                            </div>
                            :
                            <div className="max-h-80 overflow-y-scroll scrollbar flex flex-col gap-2">
                            {info.propOne.map((skill, i) =>
                                <div key={i+"a"}>
                                    <h2><strong>{skill.name}</strong></h2>
                                    <div className={`${skill.requirements === "" ? "hidden" : ""}`}>
                                        <h3><strong>Requirements:</strong></h3> <p>{skill.requirements}</p>
                                    </div>
                                    <div className={`${skill.description === "" ? "hidden" : ""}`}>
                                        <h3><strong>Description:</strong></h3> <p>{skill.description}</p>
                                    </div>
                                    <div className={`${skill.criticalSuccess === "" ? "hidden" : ""}`}>
                                        <h3><strong>Critical Success:</strong></h3> <p>{skill.criticalSuccess}</p>
                                    </div>
                                    <div className={`${skill.success === "" ? "hidden" : ""}`}>
                                        <h3><strong>Success:</strong></h3> <p>{skill.success}</p>
                                    </div>
                                    <div className={`${skill.failure === "" ? "hidden" : ""}`}>
                                        <h3><strong>Failure:</strong></h3> <p>{skill.failure}</p>
                                    </div>
                                    <div className={`${skill.criticalFailure === "" ? "hidden" : ""}`}>
                                        <h3><strong>Critical Failure:</strong></h3> <p>{skill.criticalFailure}</p>
                                    </div>
                                    <div className={`${skill.samples === "" ? "hidden" : ""}`}>
                                        <h3><strong>Samples:</strong></h3> <p>{skill.samples}</p>
                                    </div>
                                    {skill.table && <div>
                                        <h3><strong>Table:</strong></h3>
                                        <table>
                                            <tbody>
                                            {
                                                skill.table.map((row, i) =>
                                                    <tr key={i + "bce"} className="p-2 border-b border-on-surface">
                                                        <td className="px-2">{row[0]}</td>
                                                        <td className="px-2 w-96">{row[1]}</td>
                                                        {row[2] && <td className="px-2">{row[2]}</td>}
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>}
                                </div>
                            )}
                            </div>
                        }             
                </div>
            </div>
        </li>
    )
}