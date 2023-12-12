import useGetMonsterInfo from "./useGetMonsterInfo";
// TODO Rewrite DB idiotic columns!! From array of strings to json file
export default function EnemyCard({
  monsterName,
}: {
  monsterName: string | undefined;
}) {
  if (!monsterName) monsterName = "";
  const { monster } = useGetMonsterInfo(monsterName);
  console.log(monster);

  return (
    <div className="flex flex-col w-[600px]">
      <h1 className="bg-primary text-white w-full p-1.5 font-semibold text-lg">
        {monster?.name.toUpperCase()}
      </h1>
      <div className="p-4 bg-surface max-h-[500px] overflow-y-auto scrollbar">
        <p>
          <strong>HP: </strong>
          {monster?.hp}
        </p>
        <p>
          <strong>AC: </strong>
          {monster?.ac}
        </p>
        <p>
          <strong>Save Throws: </strong>Fortitude {monster?.ts[0]}, Reflexes{" "}
          {monster?.ts[1]}, Will {monster?.ts[2]}
          {monster?.more_ts && `; ${monster.more_ts}`}
        </p>
        {monster?.immunities && (
          <p>
            <strong>Immunities: </strong>
            {monster?.immunities}
          </p>
        )}
        {monster?.resistances && (
          <p>
            <strong>Resistances: </strong>
            {monster?.resistances}
          </p>
        )}
        {monster?.weaknesses && (
          <p>
            <strong>Weaknesses: </strong>
            {monster?.weaknesses}
          </p>
        )}
        <div>
          <p>
            <strong>Perception: </strong>+{monster?.perception}
            {monster?.more_perception ? `, ${monster?.more_perception}` : ""}
          </p>
          <p>
            <strong>Speed: </strong> {monster?.speed} metres
            {monster?.more_speed ? `, ${monster?.more_speed}` : null}
          </p>
          {monster?.conditions && (
            <>
              {monster?.conditions.map((el: string) => (
                <p key={el}>
                  <span className="font-bold">{el[0]}:</span> {el[1]}
                </p>
              ))}
            </>
          )}
        </div>
        <div className="mt-8">
          {monster?.["attacks-melee"] && (
            <>
              <strong>Melee: </strong>
              <ul className="ml-8 list-disc">
                {monster?.["attacks-melee"].map((att: string, i: number) => (
                  <li key={i}>
                    {att[0]}
                    {att[1] ? `, ${att[1]}` : ""}
                    {`, ${att[2]}`}
                  </li>
                ))}
              </ul>
            </>
          )}
          {monster?.["attacks-ranged"] && (
            <>
              <strong>Ranged: </strong>
              <ul className="ml-8 list-disc">
                {monster?.["attacks-ranged"].map((att: string, i: number) => (
                  <li key={i}>
                    {att[0]}
                    {att[1] ? `, ${att[1]}` : ""}
                    {`, ${att[2]}`}
                  </li>
                ))}
              </ul>
            </>
          )}

          {monster?.["attacks-special"] && (
            <>
              <strong>Special: </strong>
              <ul className="ml-8 list-disc">
                {monster?.["attacks-special"].map((att: string, i: number) => (
                  <li key={i}>
                    {att[0]}
                    {att[1] ? ` (${att[1]})` : ""}
                    {att[2] ? ` - Requirements: ${att[2]}` : ""}
                    {att[3] ? ` - Frequency: ${att[3]}` : ""}
                    {att[4] ? ` - Effect: ${att[4]}` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
          {monster?.spells_types && (
            <>
              {monster?.spells_types.map((el: string, i: number) => (
                <p>
                  {el[0] !== "" && (
                    <>
                      <span className="font-bold">{el[0]}</span> (DC {el[1]})
                      {el[2] !== "" && `, ${el[2]}`}
                      <br />
                    </>
                  )}
                  {i === 0
                    ? monster?.base_spells?.map(
                        (el: string, i: number, arr: string[]) => (
                          <>
                            {el[0] !== "" && (
                              <span key={i}>
                                <span className="font-semibold">
                                  {i === 0
                                    ? "Cantrips"
                                    : i === 1
                                    ? `${i}st`
                                    : i === 2
                                    ? `${i}nd`
                                    : i === 3
                                    ? `${i}rd`
                                    : `${i}th`}
                                  :
                                </span>{" "}
                                {el}
                                {i !== arr.length - 1 && `; `}
                              </span>
                            )}
                          </>
                        )
                      )
                    : i === 1
                    ? monster?.special_spells?.map(
                        (el: string, i: number, arr: string[]) => (
                          <>
                            {el[0] !== "" && (
                              <span key={i}>
                                <span className="font-semibold">
                                  {i === 0
                                    ? "Cantrips"
                                    : i === 1
                                    ? `${i}st`
                                    : i === 2
                                    ? `${i}nd`
                                    : i === 3
                                    ? `${i}rd`
                                    : `${i}th`}
                                  :
                                </span>{" "}
                                {el}
                                {i !== arr.length - 1 && `; `}
                              </span>
                            )}
                          </>
                        )
                      )
                    : monster?.rituals?.map(
                        (el: string, i: number, arr: string[]) => (
                          <>
                            {el[0] !== "" && (
                              <span key={i}>
                                <span className="font-semibold">
                                  {i === 0
                                    ? "Cantrips"
                                    : i === 1
                                    ? `${i}st`
                                    : i === 2
                                    ? `${i}nd`
                                    : i === 3
                                    ? `${i}rd`
                                    : `${i}th`}
                                  :
                                </span>{" "}
                                {el}
                                {i !== arr.length - 1 && `; `}
                              </span>
                            )}
                          </>
                        )
                      )}
                </p>
              ))}
            </>
          )}
          {monster?.feats && (
            <>
              <strong>Feats: </strong>
              <ul className="ml-8 list-disc">
                {monster?.feats.map((ft: string, i: number) => (
                  <li key={i}>
                    {ft[0]}
                    {ft[1] ? ` - ${ft[1]}` : ""}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {/*{monster?.spells ? <p><strong>Spells</strong> {monster?.spells}</p> :<></>}*/}
        <div className="mt-8">
          <p>
            <strong>Stats: </strong>
            Str {monster?.char[0]}, Dex {monster?.char[1]}, Con{" "}
            {monster?.char[2]}, Int {monster?.char[3]}, Wis {monster?.char[4]},
            Cha {monster?.char[5]}
          </p>
          {monster?.skills && (
            <p>
              <strong>Skills: </strong>

              {monster?.skills[0] !== 0 &&
                `Acrobatics +${monster?.skills[0]}, `}
              {monster?.skills[1] !== 0 && `Arcana +${monster?.skills[1]}, `}
              {monster?.skills[2] !== 0 && `Athletics +${monster?.skills[2]}, `}
              {monster?.skills[3] !== 0 && `Crafting +${monster?.skills[3]}, `}
              {monster?.skills[4] !== 0 && `Deception +${monster?.skills[4]}, `}
              {monster?.skills[5] !== 0 && `Diplomacy +${monster?.skills[5]}, `}
              {monster?.skills[6] !== 0 &&
                `Intimidation +${monster?.skills[6]}, `}
              {monster?.skills[7] !== 0 &&
                `${monster?.lore_spec + " " ?? ""}Lore +${
                  monster?.skills[7]
                }, `}
              {monster?.skills[8] !== 0 && `Medicine +${monster?.skills[8]}, `}
              {monster?.skills[9] !== 0 && `Nature +${monster?.skills[9]}, `}
              {monster?.skills[10] !== 0 &&
                `Occultism +${monster?.skills[10]}, `}
              {monster?.skills[11] !== 0 &&
                `Performance +${monster?.skills[11]}, `}
              {monster?.skills[12] !== 0 &&
                `Religion +${monster?.skills[12]}, `}
              {monster?.skills[13] !== 0 && `Society +${monster?.skills[13]}, `}
              {monster?.skills[14] !== 0 && `Stealth +${monster?.skills[14]}, `}
              {monster?.skills[15] !== 0 &&
                `Survival +${monster?.skills[15]}, `}
              {monster?.skills[16] !== 0 && `Thievery +${monster?.skills[16]}`}
            </p>
          )}
          {monster?.languages && (
            <p>
              <strong>Languages: </strong> {monster?.languages}
            </p>
          )}
          {monster?.items && (
            <p>
              <strong>Items: </strong> {monster?.items}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
