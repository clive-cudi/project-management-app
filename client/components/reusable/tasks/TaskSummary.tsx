import { useState, useEffect } from "react";
import type { TaskCategory, Priority_ } from "../../../types";
import styles from "../../../styles/components/reusable/tasks/tasksummary.module.scss";
import { IconBtn } from "../buttons";
import { BsFilter, BsPlus, BsBookmarkCheck } from "react-icons/bs";
import { TaskInfoRow } from "./TaskInfoRow";
import { useModal, useTaskStore, useTabRenderer } from "../../../hooks";
import { CreateTaskFormWithAssignees } from "../../forms";
import { Spinner } from "../widgets";
import { AiOutlineDelete } from "react-icons/ai";
import { HiSwitchHorizontal } from "react-icons/hi";
import { removeAtIndex } from "../../../utils";
import { useMutation } from "react-query";

interface TaskSummary_Props {
  tasks: {
    id: string;
    label: string;
    isChecked: boolean;
    badgeStatus: TaskCategory | Priority_;
  }[];
  period?: string;
}

export const TaskSummary = ({ tasks, period = "today" }: TaskSummary_Props) => {
  const [newTaskName, setNewTaskName] = useState<string>("");
  const { openModal } = useModal();
  const { isLoading } = useTaskStore();
  const { switchTab } = useTabRenderer();
  const [markedTasks, setMarkedTasks] = useState<string[]>([]);

  function handleCreateTask() {
    openModal(
      <CreateTaskFormWithAssignees initialValues={{ name: newTaskName }} />
    );
  }

  function handleMarkAction(id: string, checked: boolean) {
    // check if the id exists in markedTasks
    const targetIndex = markedTasks.findIndex((taskID) => taskID === id);
    // if (markedTasks.includes(id)) {
    //   // remove the task
    // //   let prevMarked = [...markedTasks];
    //   setMarkedTasks((prevMarkedTasks) => removeAtIndex(prevMarkedTasks, targetIndex));
    // } else {
    //   // add to markedTask List
    //   setMarkedTasks([...new Set([...markedTasks, id])]);
    // // setMarkedTasks([...markedTasks, id]);
    // }

    if (!checked && markedTasks.includes(id)) {
        setMarkedTasks((prevMarkedTasks) => removeAtIndex(prevMarkedTasks, targetIndex));
    } else if  (checked && !markedTasks.includes(id)) {
      setMarkedTasks([...new Set([...markedTasks, id])]);
    }
  }

  function handleMarkAs() {

  }

  function handleChangePriority() {

  }

  function handleRemove() {
    
  }

  useEffect(() => {
    console.log(markedTasks);
  }, [markedTasks]);

  return (
    <div className={styles.task_summary_wrapper}>
      <div className={styles.ts_nav_wrapper}>
        <div className={styles.ts_nav_title}>
          <h4>Tasks</h4>
          <span>{period}</span>
        </div>
        <div className={styles.ts_nav_utils}>
          <span
            onClick={(e) => {
              switchTab({ label: "task_list" });
            }}
          >
            View All
          </span>
          <IconBtn icon={<BsFilter />} variant={"outlined"} />
        </div>
      </div>
      <div className={styles.ts_new_task_wrapper}>
        <input
          type={"text"}
          placeholder={"Create new task"}
          onChange={(e) => {
            setNewTaskName(e.target.value);
          }}
        />
        <IconBtn
          icon={<BsPlus />}
          variant={"util"}
          onClick={() => {
            handleCreateTask();
          }}
        />
      </div>
      <div className={styles.ts_tasks_lists}>
        {tasks.length > 0 ? (
          tasks.map((task, ix) => {
            return (
              <TaskInfoRow
                key={ix}
                badge={{ type: task.badgeStatus }}
                label={task.label}
                onChangeHandler={(e) => {
                  // handleMarkAction(task.id, e.target.checked);
                  if (e.target.checked === true) {
                    setMarkedTasks([...new Set([...markedTasks, task.id])]);
                  } else {
                    if (markedTasks.includes(task.id)) {
                      const targetIndex = markedTasks.findIndex((taskID) => taskID === task.id);
                      setMarkedTasks(removeAtIndex(markedTasks, targetIndex));
                    }
                  }
                  console.log(
                    `Check ${task.label}: ${e.target.checked}\ntaskID: ${task.id}`
                  );
                }}
              />
            );
          })
        ) : isLoading ? (
          <Spinner />
        ) : (
          <h5>No Tasks Found</h5>
        )}
      </div>
      {markedTasks.length > 0 ? (
        <div className={styles.ts_action_nav}>
            <button className={`${styles["ts_action_variant_mark"]}`}><span><BsBookmarkCheck /></span>Mark as</button>
            <button className={`${styles["ts_action_variant_change"]}`}><span><HiSwitchHorizontal /></span>Change Priority</button>
            <button className={`${styles["ts_action_variant_delete"]}`}><span><AiOutlineDelete /></span>Remove</button>
        </div>
      ) : null}
    </div>
  );
};
