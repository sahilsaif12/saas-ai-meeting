import { AgentGetOne } from "../../types";

interface AgentFormProps{
    onSuccess?:()=>void;
    onCancel?:()=>void;
    initialValues?:AgentGetOne
}

export const AgentForm=({onSuccess,onCancel,initialValues}:AgentFormProps)=>{

}