import FormComponent from "@/utils/Actions";
import {getAction} from "@/services/SubTaskService";
import {IAction, IActionList} from "@/interfaces/IAction";
import { useEffect, useState } from "react";
import React from "react";
import { ENDPOINT } from "@/services/const";

/*
const SubTaskScreen = (props) => {
    const sid = "1"
    const [state, setState] = useState<IActionList>(null);
    
    const handleFetch = async () => {
        console.log("RESPONSE")
        const response = await fetch(`${ENDPOINT}/api/subtasks/1/action`)
        const data = await response.json()
        try {setState(data) 
        } catch (err) {
            console.log("set state failed", err)
        }

        console.log(data)
        console.log(state)
    }

    handleFetch()

    console.log("action response", state)

*/

 const SubTaskScreen = (props) => {
    // props should include a id field
    const [state, setState] = useState<IActionList>();

    useEffect(() => {
        const fetchAction = async (subtask_id: number) => {
            try {
                const action = await getAction(subtask_id);
                console.log("here is the action: ", action)
                setState(action);
            } catch (err) {
                console.log("failed to setState", err);
            };
        };
        fetchAction(props.id);
    }, [props.id]);

    useEffect(() => {
        // log the updated state here
        console.log("here is the current state: ", state);
    }, [state]);



/*
return(
    <FormComponent actions={state}/>
);
};

export default SubTaskScreen
*/

/*
const SubTaskScreen = () => {
    const [state, setState] = useState<IActionList>(null);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch(`${ENDPOINT}/api/subtasks/1/action`);
                const data = await response.json();
                setState(data);
                console.log("action response", data);
            } catch (err) {
                console.log("fetch failed", err);
            }
        };

        handleFetch();
    }, []); // Empty dependency array to run the effect only once after the initial render

    useEffect(() => {
        console.log("The state is ", state);
    }, [state]); // Log the state whenever it changes

    */

    if (state === null) {
        // Data is still being fetched, you can render a loading indicator or return null
        return null;
    }

    return <FormComponent actions={state} />;
};

export default SubTaskScreen;