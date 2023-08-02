import { useFighters } from "../contexts/FightersContext";

export default function EnemyCard() {

    const{foes, isOpen} = useFighters()

    if(isOpen === null || foes.filter(foe => foe.name === isOpen.match(/\(?\b[a-z]+\b\)?/ig)?.join(" ")).length < 1) return null;

    const [enemyInfo] = foes.filter(foe => foe.name === isOpen.match(/\(?\b[a-z]+\b\)?/ig)?.join(" "));

    return(
        <div className="flex flex-col w-[600px]">
            <h1 className="bg-primary text-white w-full p-1.5 font-semibold text-lg">{enemyInfo.name.toUpperCase()}</h1>
            <div className="p-4 bg-surface max-h-[500px] overflow-y-auto scrollbar">
                <p><strong>HP</strong> {enemyInfo.hp}</p>
                <p><strong>AC</strong> {enemyInfo.ac}</p>
                <p><strong>TS</strong> {enemyInfo.ts}</p>
                <p><strong>Perception</strong> {enemyInfo.perception}</p>
                {enemyInfo.conditions 
                                    ? <ul className="ml-8 list-disc">
                                        <li>{enemyInfo.conditions?.[1]}</li>
                                        {enemyInfo.conditions?.[2] ? <li>{enemyInfo.conditions?.[2]}</li> : <></>}
                                        </ul>
                                    : <></>}
                {enemyInfo.immunities ? <p><strong>Immunities</strong> {enemyInfo.immunities}</p> : <></>}
                {enemyInfo.resistances ? <p><strong>Resistances</strong> {enemyInfo.resistances}</p> : <></>}
                {enemyInfo.weaknesses ? <p><strong>Weaknesses</strong> {enemyInfo.weaknesses}</p> : <></>}
                {enemyInfo.attacks.melee
                ? <div><strong>Melee</strong>
                    <ul className="ml-8 list-disc">
                        <li key={enemyInfo.attacks.melee?.[1]}>{enemyInfo.attacks.melee?.[1]}</li>
                        {enemyInfo.attacks.melee?.[2] ? <li key={enemyInfo.attacks.melee?.[2]}>{enemyInfo.attacks.melee?.[2]}</li> : <></>}
                    </ul>
                </div>
                : <></>}
            {enemyInfo.attacks.ranged
            ? <div><strong>Ranged</strong>
                    <ul className="ml-8 list-disc">
                        <li key={enemyInfo.attacks.ranged?.[1]}>{enemyInfo.attacks.ranged?.[1]}</li>
                        {enemyInfo.attacks.ranged?.[2] ? <li key={enemyInfo.attacks.ranged?.[2]}>{enemyInfo.attacks.ranged?.[2]}</li> : <></>}
                    </ul>
                </div>
                : <></>}
                {enemyInfo.attacks.special 
                ? <div><strong>Special</strong>
                    <ul className="ml-8 list-disc">
                        <li key={enemyInfo.attacks.special?.[1]}>{enemyInfo.attacks.special?.[1]}</li>
                        {enemyInfo.attacks.special?.[2] ? <li key={enemyInfo.attacks.special?.[2]}>{enemyInfo.attacks.special?.[2]}</li> : <></>}
                        {enemyInfo.attacks.special?.[3] ? <li key={enemyInfo.attacks.special?.[3]}>{enemyInfo.attacks.special?.[3]}</li> : <></>}
                    </ul>
                </div>
                : <></>}
                {enemyInfo.skills ? <p><strong>Skills</strong> {enemyInfo.skills}</p> : <></>}
                {enemyInfo.feats 
                ? <div><strong>Feats</strong>
                    <ul className="ml-8 list-disc">
                        <li key={enemyInfo.feats?.[1]}>{enemyInfo.feats?.[1]}</li>
                        {enemyInfo.feats?.[2] ? <li key={enemyInfo.feats?.[2]}>{enemyInfo.feats?.[2]}</li> : <></>}
                        {enemyInfo.feats?.[3] ? <li key={enemyInfo.feats?.[3]}>{enemyInfo.feats?.[3]}</li> : <></>}
                        {enemyInfo.feats?.[4] ? <li key={enemyInfo.feats?.[4]}>{enemyInfo.feats?.[4]}</li> : <></>}
                    </ul>
                </div>
                : <></>}
                {enemyInfo.spells ? <p><strong>Spells</strong> {enemyInfo.spells}</p> :<></>}
                <p><strong>Speed</strong> {enemyInfo.speed}</p>
                <p><strong>Stats</strong> {enemyInfo.stats}</p>
                {enemyInfo.languages ? <p><strong>Languages</strong> {enemyInfo.languages}</p> : <></>}
                {enemyInfo.items ? <p><strong>Items</strong> {enemyInfo.items}</p> : <></>}
            </div>
        </div>
    )
}