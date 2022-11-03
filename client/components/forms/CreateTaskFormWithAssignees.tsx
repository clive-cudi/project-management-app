import { useState } from "react";
import { ModalFormWrapper } from "../layout";
import { CreateTaskForm } from "./CreateTaskForm";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { SearchInput, Table } from "../reusable";

export const CreateTaskFormWithAssignees = (): JSX.Element => {
    const [assigneeTableData, setAssigneeTableData] = useState({
        headers: ["Name", "Email", "Role", "Notify"],
        data: [
            ["Karen William", "karenwilliam@gmail.com", "", ""]
        ]
    });

    return (
        <ModalFormWrapper title={"Add Task"} form={null} className={styles.ctwa_modal_form_wrapper} childrenContClassName={styles.ctwa_modal_form_child_cont}>
            <CreateTaskForm />
            <div className={styles.ctwa_assignee_form_wrapper}>
                <div className={styles.ctwa_assignee_form_header}>
                    <h4>Select Assignees</h4>
                </div>
                <div className={styles.ctwa_assignee_form_content}>
                    <SearchInput placeholder="Search members" />
                    {assigneeTableData.data.length > 0 ? <Table tableConfig={{headers: assigneeTableData.headers, data: assigneeTableData.data}} /> : null}
                </div>
            </div>
        </ModalFormWrapper>
    )
}