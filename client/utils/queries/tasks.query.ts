import { api } from "../axios/axios.config";
import { API_res_model, taskRes, GeneralTaskStatus_, Priority_ } from "../../types";
import { TaskFormFieldData_ } from "../../components/forms/CreateTaskForm";

export const TaskQueries = (session: any) => {
    const defaultReqConfig = {
        headers: {
            Authorization: session.data?.user.token ?? ""
        }
    }

    const getAllTasks = async (): Promise<API_res_model & {tasks: string[]}> => {
        return (await api.get("/task/getalltasks", defaultReqConfig)).data;
    }

    const getTaskByID = async ({ id }:{id: string}): Promise<API_res_model & taskRes> => {
        return (await api.get(`/task/taskbyid/${id}`, defaultReqConfig)).data;
    }

    const getMultipleTasksByID = async ( { tids } :{tids: string[]}): Promise<API_res_model & {tasks: taskRes[]}> => {
        return (await api.post(`/task/getmultipletasks`, {tids}, defaultReqConfig)).data;
    }

    const addTask = async ({ form_data }:{form_data: TaskFormFieldData_}): Promise<API_res_model & {task: taskRes}> => {
        return (await api.post("/task/add", form_data, defaultReqConfig)).data;
    }

    const updateTaskStatus = async ({ tid, status }: {tid: string, status: GeneralTaskStatus_}): Promise<API_res_model & {task: taskRes}> => {
        return (await api.post("/task/update-status", {tid, status}, defaultReqConfig));
    }

    const updateTaskPriority = async ({ tid, priority }:{tid: string, priority: Priority_}): Promise<API_res_model & {task: taskRes}> => {
        return (await api.post("/task/update-priority", {tid, priority}, defaultReqConfig))
    }

    return {
        getAllTasks,
        getTaskByID,
        getMultipleTasksByID,
        addTask,
        updateTaskStatus,
        updateTaskPriority
    }
}