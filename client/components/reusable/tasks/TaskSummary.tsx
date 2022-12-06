import { useState, useEffect, useMemo } from "react";
import type { TaskCategory, Priority_ } from "../../../types";
import styles from "../../../styles/components/reusable/tasks/tasksummary.module.scss";
import { IconBtn } from "../buttons";
import { BsFilter, BsPlus, BsBookmarkCheck } from "react-icons/bs";
import { TaskInfoRow } from "./TaskInfoRow";
import { useModal, useTaskStore, useTabRenderer, useContextMenu } from "../../../hooks";
import { CreateTaskFormWithAssignees } from "../../forms";
import { Spinner } from "../widgets";
import { AiOutlineDelete } from "react-icons/ai";
import { HiSwitchHorizontal } from "react-icons/hi";
import { removeAtIndex } from "../../../utils";
import { useMutation } from "@tanstack/react-query";
import { MarkAsModal, ChangePriorityModal, ErrorModal } from "../modals";

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
  const [filterTag, setFilterTag] = useState<string>("");
  const filterTasksOptions = useMemo(() => [
    <button key={22} onClick={() => {setFilterTag("high")}}>High</button>,
    <button key={24} onClick={() => {setFilterTag("medium")}}>Medium</button>,
    <button key={26} onClick={() => {setFilterTag("low")}}>Low</button>,
    <button key={20} onClick={() => {setFilterTag("")}}>Remove Filter</button>
  ], []);
  const { openAtCursor } = useContextMenu();

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
    openModal(<MarkAsModal title={"Mark as ..."} options={[{label: "todo", value: "todo"}, {label: "pending", value: "pending"}, {label: "done", value: "done"}]} />)
  }

  function handleChangePriority() {
    openModal(<ChangePriorityModal title={"Change Priority to ..."} options={[{label: "low", value: "low"}, {label: "medium", value: "medium"}, {label: "high", value: "high"}]} />)
  }

  function handleRemove() {
    openModal(<ErrorModal title={"Delete Confirmation"} message={"Are you sure you want to delete the selected items."} type={"error"} btn_label={"Delete"} btn_onclick={() => {}} />)
  }

  function handleRemoveRequest() {

  }

  function handlePriorityChangeRequest(priority: string) {

  }

  function handleMarkAsRequest(mark: string) {

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
          <IconBtn icon={<BsFilter />} variant={"outlined"} onClick={(e) => {openAtCursor(e, filterTasksOptions)}} />
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
            if (filterTag.length > 0) {
              if (filterTag === task.badgeStatus) {
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
              } else {
                return null;
              }
            } else {
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
            }
          })
        ) : isLoading ? (
          <Spinner />
        ) : (
          <h5>No Tasks Found</h5>
        )}
      </div>
      {markedTasks.length > 0 ? (
        <div className={styles.ts_action_nav}>
            <button className={`${styles["ts_action_variant_mark"]}`} onClick={handleMarkAs}><span><BsBookmarkCheck /></span>Mark as</button>
            <button className={`${styles["ts_action_variant_change"]}`} onClick={handleChangePriority}><span><HiSwitchHorizontal /></span>Change Priority</button>
            <button className={`${styles["ts_action_variant_delete"]}`} onClick={handleRemove}><span><AiOutlineDelete /></span>Remove</button>
        </div>
      ) : null}
    </div>
  );
};
