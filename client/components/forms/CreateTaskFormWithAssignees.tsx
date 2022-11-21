import { useState, useEffect } from "react";
import { ModalFormWrapper } from "../layout";
import { CreateTaskForm, TaskFormFieldData_ } from "./CreateTaskForm";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { SearchInput, Table, RegularBtn } from "../reusable";
import { useModal, useTasks } from "../../hooks";
import { TaskQueries, api } from "../../utils";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { API_res_model, taskRes } from "../../types";

interface CreateTaskFormWithAssignees_Props {
    initialValues?: {
        name?: string,
        description?: string
    }
}

export const CreateTaskFormWithAssignees = ({ initialValues }: CreateTaskFormWithAssignees_Props): JSX.Element => {
    const [assigneeTableData, setAssigneeTableData] = useState({
        headers: ["Name", "Email", "Role", "Notify"],
        data: [
            ["Karen William", "karenwilliam@gmail.com", "", ""]
        ]
    });
    const [isAssignedToSelf, setIsAssignedToSelf] = useState<boolean>(false);
    const [createTaskFormData, setCreateTaskFormData] = useState<TaskFormFieldData_>({
        name: initialValues?.name ?? "",
        description: "",
        start: "",
        finish: "",
        priority: "",
        type: "",
        project: isAssignedToSelf ? "me" : ""
    });
    const { closeModal } = useModal();
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const session = useSession();
    // const { addTask } = TaskQueries(session);
    const { tasks } = useTasks();
    const addTask = async (form_data: TaskFormFieldData_): Promise<API_res_model & {task: taskRes}> => {
        return (await api.post("/task/add", form_data, {
            headers: {
                Authorization: session.data?.user.token ?? ""
            }
        })).data;
    }
    const createTask = useMutation({mutationFn: addTask,
        onMutate: () => {
            setIsFormLoading(true);
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onSettled: () => {
            setIsFormLoading(false);
        }
    });

    function submit() {
        console.log(typeof addTask);
        if (createTaskFormData) {
            console.log(createTaskFormData);

            createTask.mutate(createTaskFormData)
            // console.log(data);

            console.log(createTask.data)
        }
    }

    return (
        <ModalFormWrapper title={"Add Task"} form={null} className={styles.ctwa_modal_form_wrapper} childrenContClassName={styles.ctwa_modal_form_child_cont}>
            <CreateTaskForm isAssignedToMyself={(e) => {setIsAssignedToSelf(e.target.checked)}} getTaskFormData={(formData)=> {setCreateTaskFormData(formData);}} initialValues={initialValues} />
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
                <RegularBtn label={"Save & Close"} onClick={() => {submit()}} variant={"gradient"} disabled={isFormLoading} />
                <RegularBtn label={"Save & Add another"} onClick={() => {}} variant={"gradient"} disabled={isFormLoading} />
                <RegularBtn label={"Cancel"} onClick={() => {closeModal()}} variant={"gradient"} disabled={isFormLoading} />
            </div>
        </ModalFormWrapper>
    )
}