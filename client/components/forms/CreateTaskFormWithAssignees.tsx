import { useState, useEffect } from "react";
import { ModalFormWrapper } from "../layout";
import { CreateTaskForm, TaskFormFieldData_ } from "./CreateTaskForm";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { SearchInput, Table, RegularBtn } from "../reusable";
import { useModal, useTasks, useTaskStore } from "../../hooks";
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
        project: "me"
    });
    const { openModal, closeModal } = useModal();
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const session = useSession();
    // const { addTask } = TaskQueries(session);
    const { tasks, setTasks } = useTasks();
    const addTask = async (form_data: TaskFormFieldData_): Promise<API_res_model & {task: taskRes}> => {
        return (await api.post("/task/add", form_data, {
            headers: {
                Authorization: session.data?.user.token ?? ""
            }
        })).data;
    }
    const [submitAction, setSubmitAction] = useState<"save_close" | "save_add">("save_close");
    const { add, tasks: storeTasks } = useTaskStore();
    const createTask = useMutation({mutationFn: addTask,
        onMutate: () => {
            setIsFormLoading(true);
        },
        onSuccess: (res) => {
            console.log(res);
            // update the task list with res.task
            setTasks((prevTasks) => [...prevTasks, res.task]);
            add(res.task);
            console.log(submitAction)
            if (submitAction == "save_add") {
                openModal(null, true);
            } else {
                closeModal();
            }
        },
        onSettled: () => {
            setIsFormLoading(false);
            console.log(storeTasks)
        }
    });

    function submit(action: "save_close" | "save_add") {
        setSubmitAction(action);
        const {priority, type, project, ...requiredData} = createTaskFormData;
        if ([...Object.values(requiredData)].every(Boolean)) {
            console.log(createTaskFormData);

            // polyfill the empty values
            const submitData = {...createTaskFormData};

            Object.keys(submitData).forEach((key) => {
                if (submitData[key as keyof TaskFormFieldData_] === "") {
                    switch (key) {
                        case "priority":
                            submitData[key] = "medium";
                            return;
                        case "type":
                            submitData[key] = "deliverable";
                            return;
                        case "project":
                            submitData[key] = "me";
                            return;
                    }
                }
            });

            createTask.mutate(submitData);
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
                <RegularBtn label={"Save & Close"} onClick={() => {submit("save_close")}} variant={"gradient"} isLoading={{status: isFormLoading}} disabled={isFormLoading} />
                <RegularBtn label={"Save & Add another"} onClick={() => {submit("save_add")}} variant={"gradient"} isLoading={{status: isFormLoading}} disabled={isFormLoading} />
                <RegularBtn label={"Cancel"} onClick={() => {closeModal()}} variant={"gradient"} isLoading={{status: isFormLoading}} disabled={isFormLoading} />
            </div>
        </ModalFormWrapper>
    )
}