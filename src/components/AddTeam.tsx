import { useFighters } from "../contexts/FightersContext";
import Button from "../storybook_components/Button";

export default function AddTeam() {
  const { friends, dispatch } = useFighters();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-7xl font-bold">DM DIGITAL SCREEN</h1>
      <h2 className="text-4xl font-bold">
        The perfect tool to master your PF2e sessions
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-xl text-center font-semibold w-[45%]">
          NOTE: At the moment, this app is not responsive. Even when
          responsiveness will be implemented, the visualization will be optimal
          only on devices no smaller than a tablet.
        </h3>
        <h3 className="text-xl text-center font-semibold mb-8 w-[45%]">
          NOTE 2: The monsters database is still under construction, so your
          choice will be veeeery limited.
        </h3>
      </div>
      <Button
        label="Add new party"
        onClick={() => dispatch({ type: "resetParty" })}
        rank="main"
      />
      {friends[0] !== "1" && (
        <div className="flex items-center justify-center gap-4">
          <p>It seems you already have a party saved. Use it?</p>
          <Button
            label="Yes!"
            onClick={() => dispatch({ type: "statusChange" })}
          />
        </div>
      )}
    </div>
  );
}
