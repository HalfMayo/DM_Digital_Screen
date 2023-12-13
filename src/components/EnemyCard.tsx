import { Json } from "../../supabaseTypes";
import AttackBase from "../interfaces/AttackBase";
import AttackSpecial from "../interfaces/AttackSpecial";
import Condition from "../interfaces/Condition";
import Feat from "../interfaces/Feat";
import SaveThrows from "../interfaces/SaveThrows";
import Spell from "../interfaces/Spell";
import Stats from "../interfaces/Stats";
import useGetMonsterInfo from "./useGetMonsterInfo";
// TODO Rewrite DB idiotic columns!! From array of strings to json file
export default function EnemyCard({
  monsterName,
}: {
  monsterName: string | undefined;
}) {
  if (!monsterName) monsterName = "";

  const { monster } = useGetMonsterInfo(monsterName);
  const skills: string[] = formatSkills();
  const spells = formatSpells();

  //TYPE CHECKING FNS
  function isStat(el: Json | undefined): el is Stats {
    return (el as Stats).strenght !== undefined;
  }

  function isTs(el: Json | undefined): el is SaveThrows {
    return (el as SaveThrows).fortitude !== undefined;
  }

  function isFeat(el: Json | undefined): el is Feat {
    return (el as Feat).feat !== undefined;
  }

  function isAttackBase(el: Json | undefined): el is AttackBase {
    return (el as AttackBase).weapon !== undefined;
  }

  function isAttackSpecial(el: Json | undefined): el is AttackSpecial {
    return (el as AttackSpecial).effect !== undefined;
  }

  function isCondition(el: Json | undefined): el is Condition {
    return (el as Condition).condition !== undefined;
  }

  function isSpell(el: Json | undefined): el is Spell {
    return (el as Spell).type !== undefined;
  }

  //FORMATTING FNS
  function formatSkills() {
    if (monster?.skills) {
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
      const skills = nonNullSkills.map((skill) => skill.join(" "));
      return skills.sort();
    }
    return [];
  }

  function formatSpells() {
    if (monster?.spells && Array.isArray(monster?.spells)) {
      const spellListArr = monster.spells.map((el: Json) => {
        if (isSpell(el)) {
          const nonNullSpells = [];
          for (let i = 0; i < Object.keys(el?.list).length; i++) {
            if (Object.values(el?.list)[i] !== "") {
              const key =
                Object.keys(el?.list)[i].slice(0, 1).toUpperCase() +
                Object.keys(el?.list)[i].slice(1);
              nonNullSpells.push([key, Object.values(el?.list)[i]]);
            }
          }
          return {
            type: el?.type,
            dc: el?.dc,
            roll: el?.roll,
            list: nonNullSpells,
          };
        }
      });
      return spellListArr;
    }
    return [];
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
          <strong>Save Throws: </strong>Fortitude{" "}
          {monster?.save_throws &&
            isTs(monster?.save_throws) &&
            monster?.save_throws?.fortitude}
          , Reflexes{" "}
          {monster?.save_throws &&
            isTs(monster?.save_throws) &&
            monster?.save_throws?.reflex}
          , Will{" "}
          {monster?.save_throws &&
            isTs(monster?.save_throws) &&
            monster?.save_throws?.will}
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
              {Array.isArray(monster?.conditions) &&
                monster?.conditions.map((att, i) => (
                  <p key={i}>
                    {isCondition(att) && (
                      <>
                        <span className="font-bold">{att.condition}: </span>{" "}
                        {att.description}
                      </>
                    )}
                  </p>
                ))}
            </>
          )}
        </div>
        <div className="mt-4">
          {monster?.attacks_melee && (
            <>
              <strong>Melee: </strong>
              <ul className="ml-8 list-disc">
                {Array.isArray(monster?.attacks_melee) &&
                  monster?.attacks_melee.map((att, i) => (
                    <li key={i}>
                      {isAttackBase(att) && (
                        <>
                          <span className="font-semibold">{att.weapon}</span>{" "}
                          {att.roll}
                          {att.details && ` (${att.details})`}, {att.damage}
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          )}
          {monster?.attacks_ranged && (
            <>
              <strong>Ranged: </strong>
              <ul className="ml-8 list-disc">
                {Array.isArray(monster?.attacks_ranged) &&
                  monster?.attacks_ranged.map((att, i) => (
                    <li key={i}>
                      {isAttackBase(att) && (
                        <>
                          <span className="font-semibold">{att.weapon}</span>{" "}
                          {att.roll}
                          {att.details && ` (${att.details})`}, {att.damage}
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          )}

          {monster?.attacks_special && (
            <>
              <strong>Special: </strong>
              <ul className="ml-8 list-disc">
                {Array.isArray(monster?.attacks_special) &&
                  monster?.attacks_special.map((att, i) => (
                    <li key={i}>
                      {isAttackSpecial(att) && (
                        <div>
                          <span className="font-semibold">{att.name}</span>
                          {att.number_of_actions === 0
                            ? ""
                            : ` (${att.number_of_actions})`}
                          {att.details && ` (${att.details})`}
                          <br />
                          {att.requirements && (
                            <>
                              <span className="font-semibold">
                                Requirements:
                              </span>{" "}
                              {att.requirements}
                              <br />
                            </>
                          )}
                          {att.frequency && (
                            <>
                              <span className="font-semibold">Frequency:</span>{" "}
                              {att.frequency}
                              <br />
                            </>
                          )}
                          <span className="font-semibold">Effect:</span>{" "}
                          {att.effect.description}
                          {(att.effect.critical_success ||
                            att.effect.success ||
                            att.effect.failure ||
                            att.effect.critical_failure) && (
                            <ul className="pl-4 pt-2">
                              {att.effect.critical_success && (
                                <li>
                                  <span className="font-semibold">
                                    Critical success:
                                  </span>{" "}
                                  {att.effect.critical_success}
                                </li>
                              )}
                              {att.effect.success && (
                                <li>
                                  <span className="font-semibold">
                                    Success:
                                  </span>{" "}
                                  {att.effect.success}
                                </li>
                              )}
                              {att.effect.failure && (
                                <li>
                                  <span className="font-semibold">
                                    Failure:
                                  </span>{" "}
                                  {att.effect.failure}
                                </li>
                              )}
                              {att.effect.critical_failure && (
                                <li>
                                  <span className="font-semibold">
                                    Critical failure:
                                  </span>{" "}
                                  {att.effect.critical_failure}
                                </li>
                              )}
                            </ul>
                          )}
                          {att.effect.further_explanation && (
                            <ul className="pl-4 pt-2">
                              {att.effect.further_explanation?.condition_1 && (
                                <li>
                                  {att.effect.further_explanation?.condition_1}
                                </li>
                              )}
                              {att.effect.further_explanation?.condition_2 && (
                                <li>
                                  {att.effect.further_explanation?.condition_2}
                                </li>
                              )}
                              {att.effect.further_explanation?.condition_3 && (
                                <li>
                                  {att.effect.further_explanation?.condition_3}
                                </li>
                              )}
                              {att.effect.further_explanation?.condition_4 && (
                                <li>
                                  {att.effect.further_explanation?.condition_4}
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          )}
          {spells && (
            <>
              <strong>Spells: </strong>
              <ul className="ml-8 list-disc">
                {spells.map((spell, i) => (
                  <li key={i}>
                    <span className="font-semibold">{spell?.type}</span> DC{" "}
                    {spell?.dc}
                    {spell?.roll && `, ${spell.roll}`}
                    <ul className="pl-4">
                      {spell?.list.map((el, i) => (
                        <li key={i}>
                          <span className="font-semibold">{el[0]}:</span>{" "}
                          {el[1]}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
          {monster?.feats && (
            <>
              <strong>Feats: </strong>
              <ul className="ml-8 list-disc">
                {Array.isArray(monster?.feats) &&
                  monster?.feats.map((el, i) => (
                    <li key={i}>
                      {isFeat(el) && (
                        <>
                          <span className="font-semibold">{el?.feat}</span>
                          {el?.details && ` (${el.details})`}
                          {el?.description && `: ${el.description}`}
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        {/*{monster?.spells ? <p><strong>Spells</strong> {monster?.spells}</p> :<></>}*/}
        <div className="mt-4">
          <p>
            <strong>Stats: </strong>
            Str{" "}
            {monster?.stats &&
              isStat(monster?.stats) &&
              monster?.stats?.strenght}
            , Dex{" "}
            {monster?.stats &&
              isStat(monster?.stats) &&
              monster?.stats?.dexterity}
            , Con{" "}
            {monster?.stats &&
              isStat(monster?.stats) &&
              monster?.stats?.constitution}
            , Int{" "}
            {monster?.stats &&
              isStat(monster?.stats) &&
              monster?.stats?.intelligence}
            , Wis{" "}
            {monster?.stats && isStat(monster?.stats) && monster?.stats?.wisdom}
            , Cha{" "}
            {monster?.stats &&
              isStat(monster?.stats) &&
              monster?.stats?.charisma}
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
