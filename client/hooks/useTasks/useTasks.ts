import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { TaskQueries } from "../../utils";
import { taskRes } from "../../types";

export function useTasks() {
    const session = useSession();
    const [tasks, setTasks] = useState<taskRes[]>([]);
    const { getAllTasks, getTaskByID, getMultipleTasksByID } = TaskQueries(session);
    const { data: taskIds } = useQuery("taskIds", getAllTasks);
    const {data: fetchedTasks, isLoading, isError} = useQuery("tasks", () => getMultipleTasksByID(taskIds?.tasks as string[]), {enabled: !!taskIds?.tasks, onSuccess: (res) => {
        if (res.tasks.length ) {
            setTasks(res.tasks);
        }
    }})

    return {
        tasks,
        setTasks,
        isLoading
    }
}