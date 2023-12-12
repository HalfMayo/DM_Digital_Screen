import useGetMonsterInfo from "./useGetMonsterInfo";
// TODO Rewrite DB idiotic columns!! From array of strings to json file
export default function EnemyCard({
  monsterName,
}: {
  monsterName: string | undefined;
}) {
  if (!monsterName) monsterName = "";

  const { monster } = useGetMonsterInfo(monsterName);

  let skills: string[] = [];

  if (monster) {
    const nonNullSkills = [];
    for (let i = 0; i < Object.keys(monster?.skills).length; i++) {
      if (Object.values(monster?.skills)[i] !== 0) {
        const key =
          Object.keys(monster?.skills)[i] === "lore"
            ? monster?.lore_spec +
              " " +
              Object.keys(monster?.skills)[i].slice(0, 1).toUpperCase() +
              Object.keys(monster?.skills)[i].slice(1)
            : Object.keys(monster?.skills)[i].slice(0, 1).toUpperCase() +
              Object.keys(monster?.skills)[i].slice(1);
        nonNullSkills.push([key, Object.values(monster?.skills)[i]]);
      }
    }
    skills = nonNullSkills.map((skill) => skill.join(" "));
    skills.sort();
  }

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
                    <span key={el}>
                      <span className="font-bold">{el[0]}</span> (DC {el[1]})
                      {el[2] !== "" && `, ${el[2]}`}
                      <br />
                    </span>
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
            Str {monster?.stats.strenght}, Dex {monster?.stats.dexterity}, Con{" "}
            {monster?.stats.constitution}, Int {monster?.stats.intelligence},
            Wis {monster?.stats.wisdom}, Cha {monster?.stats.charisma}
          </p>
          {monster?.skills && (
            <p>
              <strong>Skills: </strong>
              {skills.join(", ")}
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
