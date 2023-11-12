import FormComponent from "@/utils/Actions";
import {getAction} from "@/services/SubTaskService";
import {IAction, IActionList} from "@/interfaces/IAction";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const SubTaskScreen = (props) => {
    const sid = "1"
    const [state, setState] = useState<IActionList>(null);
    
    const handleFetch = async () => {
        console.log("RESPONSE")
        const response = await fetch("http://localhost:8080/api/subtasks/1/action")
        const data = await response.json()
        console.log(data)
    }

    handleFetch()

    console.log("action response", state)
    return(
        <FormComponent actions={state}/>
    );
};

export default SubTaskScreen
