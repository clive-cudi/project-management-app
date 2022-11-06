import { useState, useEffect } from "react";
import { ModalFormWrapper } from "../layout";
import { CreateTaskForm } from "./CreateTaskForm";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { SearchInput, Table, RegularBtn } from "../reusable";
import { useModal } from "../../hooks";

export const CreateTaskFormWithAssignees = (): JSX.Element => {
    const [assigneeTableData, setAssigneeTableData] = useState({
        headers: ["Name", "Email", "Role", "Notify"],
        data: [
            ["Karen William", "karenwilliam@gmail.com", "", ""]
        ]
    });
    const [isAssignedToSelf, setIsAssignedToSelf] = useState<boolean>(false);
    const [createTaskFormData, setCreateTaskFormData] = useState({});
    const { closeModal } = useModal();
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

    return (
        <ModalFormWrapper title={"Add Task"} form={null} className={styles.ctwa_modal_form_wrapper} childrenContClassName={styles.ctwa_modal_form_child_cont}>
            <CreateTaskForm isAssignedToMyself={(e) => {setIsAssignedToSelf(e.target.checked)}} getTaskFormData={(formData)=> {setCreateTaskFormData(formData)}} />
            {
                isAssignedToSelf === false ?
                    <div className={styles.ctwa_assignee_form_wrapper}>
                        <div className={styles.ctwa_assignee_form_header}>
                            <h4>Select Assignees</h4>
                        </div>
                        <div className={styles.ctwa_assignee_form_content}>
                            <SearchInput placeholder="Search members" />
                            {assigneeTableData.data.length > 0 ? <Table tableConfig={{headers: assigneeTableData.headers, data: assigneeTableData.data}} /> : null}
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles.ctwa_submit_wrapper}>
                <RegularBtn label={"Save & Close"} onClick={() => {}} variant={"gradient"} disabled={isFormLoading} />
                <RegularBtn label={"Save & Add another"} onClick={() => {}} variant={"gradient"} disabled={isFormLoading} />
                <RegularBtn label={"Cancel"} onClick={() => {closeModal()}} variant={"gradient"} disabled={isFormLoading} />
            </div>
        </ModalFormWrapper>
    )
}