interface TabsProps {
    className?: string
    tabs: string[],
    state: number,
    onClick: (i:number) => void
}

export default function Tabs({className, tabs, state, onClick}: TabsProps) {

    return(
        <>
        <ul className={`relative flex gap-4 ${className}`}>
            <div className="absolute w-24 h-8 border-solid border-b-[3px] border-primary-teal transition duration-300" style={{transform: `translateX(${state*112}px)`}}></div>
            {tabs.map((tab, i) => 
                <li className="w-24 flex items-center justify-center" key={i}>
                    <button className={state === i ? "font-bold" : "font-normal"} onClick={()=>onClick(i)}>{tab}</button>
                </li>
            )}
        </ul>
        </>
    )
}