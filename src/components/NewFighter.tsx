import { useState, SyntheticEvent } from "react";
import { InitInfo, useFighters } from "../contexts/FightersContext";
import Button from "../storybook_components/Button";
import { ReactComponent as Mark } from "../assets/svgs/exclamation-svgrepo-com.svg";
import useGetMonstersNames from "./useGetMonstersNames";
import { MonsterProps } from "../../supabaseTypes";

type ErrorForm = "errorFighter" | "errorInitiative";

export default function NewFighter() {
  const { dispatch, initiativeOrder, addNew, friends, inputValue } =
    useFighters();
  const { monstersNames } = useGetMonstersNames();

  const [value, setValue] = useState<string>("");
  const [invisible, setInvisible] = useState<boolean>(false);
  const [faction, setFaction] = useState<string>("friend");
  const [fighterName, setFighterName] = useState<string>("");
  const [initValue, setInitValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [incompleteForm, setIncompleteForm] = useState<ErrorForm | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.checked ? setFaction("foe") : setFaction("friend");
  }

  function handleClick(monster: string) {
    setFighterName(monster);
    setValue(monster);
    setInvisible(true);
    dispatch({ type: "updateInputValue", payload: monster });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const eventSubmitter = (
      e.nativeEvent as SubmitEvent
    ).submitter?.getAttribute("value");

    function dispatchHandler(type: "addFighter" | "submitOrder") {
      const initNameFilter = initiativeOrder.filter(
        (init: InitInfo) =>
          init.name?.match(/\(?\b[a-z]+\b\)?/gi)?.join(" ") === fighterName
      ).length;
      const enemyInfo = monstersNames?.filter(
        (foe: MonsterProps) => foe.name === fighterName
      );
      setIncompleteForm(null);
      setSubmitted(true);
      dispatch({
        type: type,
        payload: {
          faction: faction,
          name:
            faction === "friend" || enemyInfo?.[0].unique
              ? fighterName
              : fighterName + " " + (initNameFilter + 1),
          initiative: initValue,
          conditions: "-",
        },
      });
    }

    if (fighterName === "default" || fighterName === "") {
      setIncompleteForm("errorFighter");
      return;
    }

    if (initValue === "" || /\D/g.test(initValue)) {
      setIncompleteForm("errorInitiative");
      return;
    }

    if (
      faction === "friend" &&
      initiativeOrder.filter((init: InitInfo) => init.name === fighterName)
        .length > 0
    ) {
      setIncompleteForm("errorFighter");
      return;
    }

    if (eventSubmitter === "Add this fighter to the brawl")
      dispatchHandler("addFighter");
    else if (eventSubmitter === "Add this fighter and FIGHT!")
      dispatchHandler("submitOrder");
  }

  return (
    <>
      <form
        className={`flex flex-col items-center justify-center w-fit rounded-md bg-surface ${
          submitted ? "px-4 pt-4 gap-4" : "p-4 gap-8"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p>Friend</p>
            <label className="switch">
              <input
                type="checkbox"
                name={`faction ${(
                  Math.random() * (100001 - 1) +
                  1
                ).toString()}`}
                onChange={handleChange}
                defaultChecked={false}
                disabled={submitted}
              />
              <span className="toggle"></span>
            </label>
            <p>Foe</p>
          </div>

          {faction === "foe" ? (
            <div className="relative w-52">
              <input
                className="w-full p-0.5"
                type="text"
                value={!submitted ? inputValue : value}
                onChange={(e) => {
                  dispatch({
                    type: "updateInputValue",
                    payload: e.target.value,
                  });
                  setInvisible(false);
                }}
                disabled={submitted}
              ></input>
              {inputValue !== "" && !invisible && (
                <ul className="absolute flex flex-col top-[29px] bg-surface-container p-2 w-52 rounded-b-sm">
                  {monstersNames?.map((res: MonsterProps) => (
                    <li
                      key={res.name}
                      className="w-full p-1 rounded-sm hover:bg-primary hover:text-white"
                      onClick={() => handleClick(res.name)}
                    >
                      {res.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : faction === "friend" ? (
            <select
              className="w-52"
              onChange={(e) => setFighterName(e.target.value)}
              disabled={submitted}
            >
              <option value="default">Choose a party member</option>
              {friends.map((friend) => (
                <option key={friend} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}
          {fighterName !== "" && (
            <>
              <label htmlFor="initiative">Initiative</label>
              <input
                className="w-12 autofill-w"
                type="text"
                id="initiative"
                value={initValue}
                onChange={(e) => setInitValue(e.target.value)}
                disabled={submitted}
              />
            </>
          )}
        </div>
        {initValue !== "" && (
          <div className="flex gap-8 justify-center w-full">
            {initiativeOrder.length > 1 && !submitted && (
              <Button
                label="Add this fighter and FIGHT!"
                type="submit"
                color="primary"
              />
            )}
            {!submitted && !addNew && (
              <Button
                label="Add this fighter to the brawl"
                type="submit"
                color="primary"
                rank="main"
              />
            )}
          </div>
        )}
      </form>
      {incompleteForm === "errorFighter" ? (
        <div className="flex gap-4 bg-tertiary-container text-on-tertiary-container w-full p-2 rounded-md">
          <Mark width="24px" height="24px" />
          <p>Please select a fighter</p>
        </div>
      ) : incompleteForm === "errorInitiative" ? (
        <div className="flex gap-4  bg-tertiary-container text-on-tertiary-container w-full p-2 rounded-md">
          <Mark width="24px" height="24px" />
          <p>Please set an initiative</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
