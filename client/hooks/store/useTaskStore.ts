import create from "zustand";
import { taskRes, GeneralTaskStatus_ } from "../../types";

interface TasksStoreType {
  tasks: taskRes[];
  taskIds: string[];
  isLoading: boolean,
  add: (task: taskRes) => void;
  addMultiple: (tasks: taskRes[]) => void;
  setLoading: (isLoading: boolean) => void;
  remove: (taskID: string) => void;
  changeTaskStatus: (taskID: string, status: GeneralTaskStatus_) => void
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
    isLoading: false,
    add: (task) =>
      set((state) => {
        console.log(`Initial tasks length ${state.tasks.length}`)
        return { tasks: [...state.tasks, task] };
      }),
    addMultiple: (tasks) =>
      set((state) => {
        return { tasks: tasks };
      }),
    setLoading: (isLoading) => set((state) => {return {isLoading: isLoading}}),
    remove: (taskID) =>
      set((state) => {
        return {
          tasks: [...state.tasks].filter((tsk) => tsk.taskID !== taskID),
        };
      }),
    changeTaskStatus: (taskID, status) => set((state) => ({
      tasks: [...state.tasks].map((tsk) => {
        if (tsk.taskID === taskID) {
          tsk["status"] = status;
        }
        return tsk;
      })
    }))
  };
});
