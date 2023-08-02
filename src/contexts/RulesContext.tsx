import { useContext, createContext, useReducer, Dispatch } from "react";
import { ToggleProps } from "../interfaces/InfoProps";
import { ChildrenProps } from "../interfaces/ChildrenProps";

interface ContextProps {
    drawerContent: ToggleProps[] | null,
    isActive: string,
    isOpen: string | null,
    dispatch: Dispatch<ToggleDrawer>,
    getInfo: (info: string) => void
}

interface StateProps {
    drawerContent: ToggleProps[] | null,
    isActive: string,
    isOpen: string | null
}

interface ToggleDrawer {
    type: "toggleDrawer",
    payload: string
}

interface GetInfo {
    type: "getInfo",
    payload: ToggleProps[]
}

type Actions = ToggleDrawer | GetInfo

//isOpen deve avere il valore del value del bottone!
const initialState = {
    drawerContent: null,
    isActive: "",
    isOpen: null
}

function reducer(state:StateProps, action: Actions) {
    switch(action.type) {
        case "toggleDrawer":
            return {... state, isOpen: state.isOpen === action.payload ? null : action.payload, isActive: state.isActive === action.payload ? "" : action.payload};
        case "getInfo":
            return {...state, drawerContent: action.payload}
        default: throw new Error("WTF")
    }
}

const RulesContext = createContext<ContextProps | undefined>(undefined);
const BASE_URL = "https://equinox-mirror-vertebra.glitch.me";

function RulesProvider({children}: ChildrenProps) {
    const[{drawerContent, isActive, isOpen}, dispatch] = useReducer(reducer, initialState);

    async function getInfo(info:string) {
        try {
            const res = await fetch(`${BASE_URL}/${info}`);
            const data = await res.json();
            dispatch({type: "getInfo", payload: data});
        } catch {
            alert("None found")
        }
    }

    return(
        <RulesContext.Provider value={{drawerContent, isActive, isOpen, dispatch, getInfo}}>
            {children}
        </RulesContext.Provider>
    )
}

function useRules() {
    const context = useContext(RulesContext);
    if(context === undefined) throw new Error("Context was used outside of Provider");
    return context;
}

export {RulesProvider, useRules}