import create from "zustand";
import { taskRes } from "../../types";

interface TasksStoreType {
  tasks: taskRes[];
  taskIds: string[];
  add: (task: taskRes) => void;
  addMultiple: (tasks: taskRes[]) => void;
  remove: (taskID: string) => void;
}

function removeTaskById(arr: taskRes[], id: string): taskRes[] {
  const targetIndex = arr.findIndex((tsk) => tsk.taskID === id);

  if (targetIndex > -1) {
    return arr.splice(targetIndex, 1);
  }

  return arr;
}

export const useTaskStore = create<TasksStoreType>()((set) => {
  return {
    tasks: [],
    taskIds: [],
    add: (task) =>
      set((state) => {
        console.log(`Initial tasks length ${state.tasks.length}`)
        return { tasks: [...state.tasks, task] };
      }),
    addMultiple: (tasks) =>
      set((state) => {
        return { tasks: tasks };
      }),
    remove: (taskID) =>
      set((state) => {
        return {
          tasks: [...state.tasks].filter((tsk) => tsk.taskID !== taskID),
        };
      }),
  };
});
