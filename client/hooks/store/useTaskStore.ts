import { create } from "zustand";
import { taskRes, GeneralTaskStatus_, Priority_ } from "../../types";

interface TasksStoreType {
  tasks: taskRes[];
  taskIds: string[];
  isLoading: boolean,
  add: (task: taskRes) => void;
  addMultiple: (tasks: taskRes[]) => void;
  setLoading: (isLoading: boolean) => void;
  remove: (taskID: string) => void;
  removeMultiple: (tids: string[]) => void;
  changeTaskStatus: (taskID: string, status: GeneralTaskStatus_) => void;
  changeTaskStatusMultiple: (tids: string[], status: GeneralTaskStatus_) => void;
  changeTaskPriority: (taskID: string, priority: Priority_) => void;
  changeTaskPriorityMultiple: (tids: string[], priority: Priority_) => void;
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
    removeMultiple: (tids) => set((state) => {
      return {
        tasks: [...state.tasks].filter((tsk) => !tids.includes(tsk.taskID))
      }
    }),
    changeTaskStatus: (taskID, status) => set((state) => ({
      tasks: [...state.tasks].map((tsk) => {
        if (tsk.taskID === taskID) {
          tsk["status"] = status;
        }
        return tsk;
      })
    })),
    changeTaskStatusMultiple: (tids, status) => set((state) => ({
      tasks: [...state.tasks].map((tsk) => {
        if (tids.includes(tsk.taskID)) {
          tsk["status"] = status;
        }

        return tsk;
      })
    })),
    changeTaskPriority: (taskID, priority) => set((state) => ({
      tasks: [...state.tasks].map((tsk) => {
        if (tsk.taskID === taskID) {
          tsk["priority"] = priority;
        }

        return tsk;
      })
    })),
    changeTaskPriorityMultiple: (tids, priority) => set((state) => ({
      tasks: [...state.tasks].map((tsk) => {
        if (tids.includes(tsk.taskID)) {
          tsk["priority"] = priority;
        }

        return tsk;
      })
    }))
  };
});
