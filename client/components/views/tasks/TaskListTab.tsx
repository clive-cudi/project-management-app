import { useState, useMemo, useEffect } from "react";
import styles from "../../../styles/views/tasks/taskListTab.module.scss";
import { SearchInput, RegularBtn, InputSelect, IconBtn, Table, TaskListDropdown } from "../../reusable";
import { BsPlus, BsChevronDown } from "react-icons/bs";
import { upperCaseFirstSentence } from "../../../utils";
import { useTaskStore } from "../../../hooks";

interface taskListTableDataTypes {todo: {id: string, row: string[]}[], pending: {id: string, row: string[]}[], done: {id: string, row: string[]}[]}

export const TaskListTab = (): JSX.Element => {
    const { tasks } = useTaskStore();
    const tableHeadersData = useMemo(() => ({
        todo: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"],
        pending: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"],
        done: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"]
    }), []);
    const [taskListTableData, setTaskListTableData] = useState<taskListTableDataTypes>({
        todo: [
        ],
        pending: [
        ],
        done: [
        ]
    });
    const [taskIds, setTaskIds] = useState<string[]>([]);

    function addToList(key: keyof taskListTableDataTypes, id: string, row: string[]) {
        // check if the task exists in the list
        if (!taskListTableData[key as keyof taskListTableDataTypes].some((task) => task.id === id)) {
            if (taskIds.includes(id) === false) {
                // task doesn't exist
                console.log("Task doesn't exist")
                setTaskListTableData((prevTaskList) => ({
                    ...prevTaskList,
                    [key as keyof taskListTableDataTypes]: [
                        ...prevTaskList[key as keyof taskListTableDataTypes],
                        {
                            id: id,
                            row: row
                        }
                    ]
                }));
                // setTaskListTableData({
                //     ...taskListTableData,
                //     [key]: [
                //         ...taskListTableData[key],
                //         {
                //             id: id,
                //             row: row
                //         }
                //     ]
                // })
            }
        }
    }

    useEffect(() => {
        if (tasks.length > 0) {
            console.log(tasks)
            tasks.forEach((tsk) => {
                setTaskIds([...new Set([...taskIds, tsk.taskID])]);
                let taskRow = ["#", tsk.name, tsk.createdAt, "", tsk.priority, "0"]
                switch (tsk.status) {
                    case "todo":
                        addToList("todo", tsk.taskID, taskRow);
                        return;
                    case "pending":
                        addToList("pending", tsk.taskID, taskRow);
                        return;
                    case "done":
                        addToList("done", tsk.taskID, taskRow);
                        return;
                }
            })
        }
    }, [tasks, addToList, taskIds]);

    return (
        <div className={styles.tlst_content}>
            <div className={styles.tlst_header}>
                <div className={styles.tlst_title_block}>
                    <h2>My Tasks</h2>
                </div>
            </div>
            <div className={styles.tlst_nav_wrapper}>
                <div className={styles.tlst_nav}>
                    <div className={styles.tlst_nav_col}>
                        <SearchInput placeholder={`Search Tasks`} onChange={(e) => {}} />
                    </div>
                    <div className={styles.tlst_nav_col}>
                        <InputSelect options={[]} onChange={() => {}} />
                        <RegularBtn label={"Add Task"} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"outlined"} data-elm-type={"btn-add"} onClick={() => {}} />
                    </div>
                </div>
            </div>
            <div className={styles.tlst_drpdwns_wrapper}>
                <TaskListDropdown title={"Todo"} dropComponent={<Table tableConfig={{headers: tableHeadersData.todo.map((title) => upperCaseFirstSentence(title, "_")), data: taskListTableData.todo.map((lst) => lst.row)}} />} />
                <TaskListDropdown title={"In progress"} dropComponent={<Table tableConfig={{headers: tableHeadersData.pending.map((title) => upperCaseFirstSentence(title, "_")), data: taskListTableData.pending.map((lst) => lst.row)}} />} />
                <TaskListDropdown title={"Done"} dropComponent={<Table tableConfig={{headers: tableHeadersData.done.map((title) => upperCaseFirstSentence(title, "_")), data: taskListTableData.done.map((lst) => lst.row)}} />} />
            </div>
        </div>
    )
    // 22j01adba021
}