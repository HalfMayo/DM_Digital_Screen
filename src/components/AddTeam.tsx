import { useFighters } from "../contexts/FightersContext";
import Button from "../storybook_components/Button";

export default function AddTeam() {
  const { friends, dispatch } = useFighters();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-7xl font-bold">DM DIGITAL SCREEN</h1>
      <h2 className="text-4xl font-bold mb-8">
        The perfect tool to master your PF2e sessions
      </h2>
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
