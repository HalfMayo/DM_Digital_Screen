import { Reorder } from "framer-motion"
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";

interface List {
    items: string[],
    setItems: Dispatch<SetStateAction<string[]>>,
    onClick?: (i:number) => void,
    changeItem?: (e: React.FormEvent<HTMLFormElement>) => void,
    checked?: boolean,
    readonly?: boolean,
    editInterface?: boolean
}

export default function List({items, setItems, onClick, checked, readonly, editInterface = false} : List) {

    const[show, setShow] = useState<string|null|undefined>(null);
    const[editMode, setEditMode] = useState<string|null|undefined>(null);
    const [itemToEdit, setItemToEdit] = useState<any[]>([]);
    const editButtons = useRef<any>(null);

    function clickOutside(e: any) {
        if(editButtons.current && !editButtons.current.contains(e.target)) {
            setShow(null);
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside);
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        }
    }, [clickOutside])


    function edit(i:string) {
        show === i ? setShow(null) : setShow(i);
    }

    function activateEditMode(i:string) {
        editMode === i ? setEditMode(null) : setEditMode(i);
        setItemToEdit([items.indexOf(i), items[items.indexOf(i)]]);
        setShow(null);
    }

    function changeItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newTodos = [...items];
        newTodos.splice(itemToEdit[0], 1, itemToEdit[1]);
        setItems(newTodos);
        setItemToEdit([]);
        setEditMode(null);
    }

    function deleItem(i:number) {
        const todosRemaining = [...items];
        todosRemaining.splice(i, 1);
        setItems(todosRemaining);
    }

    return(
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((item, i) =>
                <ListItem
                    key={item}
                    item={item}
                    show={show}
                    editButtons={editButtons}
                    editMode={editMode}
                    onActivate={() => edit(item)}
                    onClick={() => onClick?.(i)}
                    onEdit={() => activateEditMode(item)}
                    onDelete={() => deleItem(i)}
                    itemToEdit={itemToEdit[1]}
                    setItemToEdit={(e) => setItemToEdit([i, e.target.value])}
                    changeItem={changeItem}
                    checked={checked}
                    readonly={readonly}
                    editInterface={editInterface}/>
        )}
        </Reorder.Group>
    )
}