import {
  useEffect,
  useContext,
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
} from "react";

interface ContextProps extends StateProps {
  dispatch: Dispatch<Actions>;
}

interface ChildrenProps {
  children: ReactNode;
}

export interface InitInfo {
  faction: string;
  name: string;
  initiative: string;
  conditions: string;
}

interface UpdatedInfo {
  state: InitInfo;
  index: number;
}

//State interface
interface StateProps {
  initiativeOrder: InitInfo[];
  isOpen: string | null;
  openEdit: string | null;
  addNew: boolean;
  index: string;
  status: string;
  friends: string[];
  inputValue: string | undefined;
}

//Actions interfaces
interface Add {
  type: "addFighter";
  payload: InitInfo;
}
interface Submit {
  type: "submitOrder";
  payload: InitInfo;
}
interface Open {
  type: "openInfo";
  payload: string;
}

interface NextStep {
  type: "nextStep";
  payload: string;
}

interface Edit {
  type: "editInterface";
  payload: string;
}

interface Update {
  type: "update";
  payload: UpdatedInfo;
}

interface Change {
  type: "changeOrder";
}

interface AddNew {
  type: "addNew";
}

interface AddMember {
  type: "addMember";
  payload: string;
}

interface AddAndGo {
  type: "addAndGo";
  payload: string;
}

interface ResetParty {
  type: "resetParty";
}

interface StatusChange {
  type: "statusChange";
}

interface UpdateInputValue {
  type: "updateInputValue";
  payload: string;
}

export type Actions =
  | Add
  | Submit
  | NextStep
  | Open
  | Edit
  | Update
  | Change
  | AddNew
  | StatusChange
  | ResetParty
  | AddMember
  | AddAndGo
  | UpdateInputValue;

const firstEl = {} as InitInfo;

const initialState: unknown[] = ["1"];

function initializer(initialState: unknown[]) {
  const storedParty = localStorage.getItem("partyMembers");
  return {
    initiativeOrder: [firstEl],
    isOpen: null,
    openEdit: null,
    addNew: false,
    index: "0",
    status: "teamChoice",
    friends: storedParty ? JSON.parse(storedParty) : initialState,
    inputValue: "",
  };
}

function reducer(state: StateProps, action: Actions) {
  switch (action.type) {
    case "addMember":
      return { ...state, friends: [...state.friends, action.payload] };
    case "addAndGo":
      const defFriends = [...state.friends, action.payload];
      if (state.friends[0] === "1") defFriends.shift();
      return { ...state, friends: defFriends, status: "input" };
    case "resetParty":
      return { ...state, status: "newTeam", friends: ["1"] };
    case "statusChange":
      return { ...state, status: "input" };
    case "addFighter":
      return {
        ...state,
        initiativeOrder: [...state.initiativeOrder, action.payload],
        inputValue: "",
      };
    case "addNew":
      return { ...state, addNew: true };
    case "submitOrder":
      const defInit = [...state.initiativeOrder, action.payload];
      if (state.initiativeOrder[0] === firstEl) defInit.shift();
      defInit.sort((a, b) => parseInt(b.initiative) - parseInt(a.initiative));
      return {
        ...state,
        status: "ordered",
        initiativeOrder: defInit,
        addNew: false,
      };
    case "changeOrder":
      const newInit = [...state.initiativeOrder];
      newInit.sort((a, b) => parseInt(b.initiative) - parseInt(a.initiative));
      return { ...state, openEdit: null, initiativeOrder: newInit };
    case "nextStep":
      const newIndex = state.initiativeOrder
        .map((el) => el.name)
        .indexOf(action.payload)
        .toString();
      return { ...state, index: newIndex };
    case "openInfo":
      return {
        ...state,
        isOpen: action.payload === state.isOpen ? null : action.payload,
      };
    case "editInterface":
      return {
        ...state,
        openEdit: action.payload === state.openEdit ? null : action.payload,
      };
    case "update":
      const updatedConditions = [...state.initiativeOrder];
      updatedConditions.splice(action.payload.index, 1, action.payload.state);
      return { ...state, initiativeOrder: updatedConditions };
    case "updateInputValue":
      return { ...state, inputValue: action.payload };
    default:
      throw new Error("Wtf are you trying to do?");
  }
}

const FightersContext = createContext<ContextProps | undefined>(undefined);

function FightersProvider({ children }: ChildrenProps) {
  const [
    {
      initiativeOrder,
      isOpen,
      openEdit,
      addNew,
      index,
      status,
      friends,
      inputValue,
    },
    dispatch,
  ] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("partyMembers", JSON.stringify(friends));
  }, [friends]);

  return (
    <FightersContext.Provider
      value={{
        initiativeOrder,
        isOpen,
        openEdit,
        addNew,
        index,
        status,
        dispatch,
        friends,
        inputValue,
      }}
    >
      {children}
    </FightersContext.Provider>
  );
}

function useFighters() {
  const context = useContext(FightersContext);
  if (context === undefined)
    throw new Error(
      "FightersContext has been used outside of FightersProvider",
    );
  return context;
}

export { FightersProvider, useFighters };
