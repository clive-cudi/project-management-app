import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { TaskQueries } from "../../utils";
import { taskRes } from "../../types";
import { useTaskStore } from "../store";

export function useTasks() {
    const session = useSession();
    const [tasks, setTasks] = useState<taskRes[]>([]);
    const tasks_ = useTaskStore((state) => state.tasks);
    const addTasks = useTaskStore((state) => state.addMultiple);
    const { getAllTasks, getTaskByID, getMultipleTasksByID } = TaskQueries(session);
    const { data: taskIds } = useQuery("taskIds", getAllTasks);
    const {data: fetchedTasks, isLoading, isError} = useQuery("tasks", () => getMultipleTasksByID(taskIds?.tasks as string[]), {enabled: !!taskIds?.tasks, onSuccess: (res) => {
        if (res.tasks.length ) {
            addTasks(tasks);
            console.log(tasks_)
            setTasks(res.tasks);
        }
    }})

    return {
        tasks,
        setTasks,
        isLoading
    }
}