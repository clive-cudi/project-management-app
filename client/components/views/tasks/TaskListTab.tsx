import { useState, useMemo } from "react";
import styles from "../../../styles/views/tasks/taskListTab.module.scss";
import { SearchInput, RegularBtn, InputSelect, IconBtn, Table, TaskListDropdown } from "../../reusable";
import { BsPlus, BsChevronDown } from "react-icons/bs";

export const TaskListTab = (): JSX.Element => {
    const tableHeadersData = useMemo(() => ({
        todo: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"],
        pending: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"],
        done: ["#", "task_name", "due_in", "assigned_to", "priority", "progress"]
    }), []);
    const [taskListTableData, setTaskListTableData] = useState<{todo: string[][], pending: string[][], done: string[][]}>({
        todo: [
            ["#", "Design Web Application", "2 days", "", "active", "50"]
        ],
        pending: [
            ["#", "Design Web Application", "2 days", "", "active", "50"]
        ],
        done: [
            ["#", "Design Web Application", "2 days", "", "active", "50"]
        ]
    });

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
                <TaskListDropdown title={"Todo"} dropComponent={<Table tableConfig={{headers: tableHeadersData.todo, data: taskListTableData.todo}} />} />
                <TaskListDropdown title={"In progress"} dropComponent={<Table tableConfig={{headers: tableHeadersData.pending, data: taskListTableData.pending}} />} />
                <TaskListDropdown title={"Done"} dropComponent={<Table tableConfig={{headers: tableHeadersData.done, data: taskListTableData.done}} />} />
            </div>
        </div>
    )
}