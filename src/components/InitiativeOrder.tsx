import NewFighter from "./NewFighter";
import EnemyCard from "./EnemyCard";
import { InitInfo, useFighters } from "../contexts/FightersContext";
import InitiativeStep from "./InititativeStep";
//import { conditions } from "../assets/fake dbs/conditions";
//import SuperAccordion from '../storybook_components/SuperAccordion';
import Button from "../storybook_components/Button";
import Sidebar from "./Sidebar";
import AddTeam from "./AddTeam";
import NewTeam from "./NewTeam";

/*NEXT:
    [X] aggiungere una textarea per le condizioni (e uno stato relativo per salvarle e visualizzarle)
    - aggiungere un bottone per il turno successivo e un'area di testo per il conteggio dei turni
    [X] aggiungere un bottone per aggiungere nuovi nemici che si uniscono allo scontro
    [X] aggiungere un bottone per cambiare l'iniziativa di chi ritarda il turno
    - migliorare la grafica, soprattutto delle schede dei mostri e dell'inserimento iniziative
    [X] useReducer per nascondere la schermata iniziale di inserimento delle iniziative [!!]
*/

export default function InitiativeOrder() {
  const { initiativeOrder, friends, dispatch, addNew, index, status, isOpen } =
    useFighters();

  return (
    <div className="flex items-start justify-center h-screen relative">
      <Sidebar />

      {status === "teamChoice" && <AddTeam />}

      {status === "newTeam" && (
        <div className="w-screen flex justify-center mt-12">
          <ul className="flex flex-col items-center justify-center gap-8 w-[600px]">
            {friends.map((el: string, i: number) => (
              <NewTeam key={el + i} />
            ))}
          </ul>
        </div>
      )}

      {status === "input" && (
        <div className="w-screen flex justify-center mt-12">
          <ul className="flex flex-col items-center justify-center gap-8 w-[600px]">
            {initiativeOrder.map((init: InitInfo, i: number) => (
              <NewFighter key={init.name + i} />
            ))}
          </ul>
        </div>
      )}

      {status === "ordered" && (
        <div className="w-screen flex justify-center mt-12">
          <div className="flex flex-col gap-8 items-center justify-center relative">
            <ul className="flex items-start justify-between gap-4">
              <progress
                className="progress h-2 absolute top-[3.2rem] left-[50%] translate-x-[-50%] z-0"
                max={initiativeOrder.length - 1}
                value={index}
                style={{
                  width: `calc((156px * ${initiativeOrder.length}) - 140px)`,
                }}
              ></progress>
              {initiativeOrder.map((init: InitInfo, i: number) => (
                <InitiativeStep key={i} init={init} i={i} />
              ))}
            </ul>
            <Button
              label="+ Add new fighter"
              color="secondary"
              rank="main"
              onClick={() => dispatch({ type: "addNew" })}
            />
            {addNew && <NewFighter />}
            {isOpen && (
              <EnemyCard
                monsterName={isOpen.match(/\(?\b[a-z]+\b\)?/gi)?.join(" ")!}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
