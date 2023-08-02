import {useState, SyntheticEvent} from 'react'
import { useFighters } from '../contexts/FightersContext'
import Button from '../storybook_components/Button'

export default function NewTeam() {

    const{friends, dispatch} = useFighters();
    const[member, setMember] = useState<string>("");
    const[submitted, setSubmitted] = useState<boolean>(false);

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const eventSubmitter = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value');

        function dispatchHandler(type: "addMember" | "addAndGo") {
            setSubmitted(true);
            dispatch({type:type, payload: member});
        }

        if(eventSubmitter === "Add") dispatchHandler("addMember")
        else if (eventSubmitter === "Set initiative") dispatchHandler("addAndGo")

    }

    return(
        <form className={`flex flex-col items-center justify-center w-fit rounded-md bg-surface ${submitted? "px-4 pt-4 gap-4" : "p-4 gap-8"}`} onSubmit={handleSubmit}>
            <input className="autofill-w w-52 p-0.5" type="text" value={member} onChange={(e) => setMember(e.target.value)} disabled={submitted} placeholder='Add party member'></input>
            <div className="flex gap-8 justify-center w-full">
                {friends.length > 1 && !submitted && <Button label="Set initiative"/>}
                {!submitted && <Button label="Add" type="submit" rank="main"/>}
            </div>
        </form>
    )
}