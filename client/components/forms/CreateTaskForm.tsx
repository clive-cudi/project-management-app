import { useMemo, useState, ChangeEvent } from "react";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { InputDiv, InputSelect } from "../reusable";
import { Priority_ } from "../../types";

interface TaskFormFieldData_ {
    name: string;
    description: string;
    start: string;
    finish: string;
    priority: string;
    type: string;
    project: string;
}

interface CreateTaskForm_Props {
    isAssignedToMyself: (e: ChangeEvent<HTMLInputElement>) => void
    getTaskFormData?: (formData: TaskFormFieldData_) => void
}

export const CreateTaskForm = ({ isAssignedToMyself, getTaskFormData }: CreateTaskForm_Props): JSX.Element => {
    const priorityOptData = useMemo<{label: string, value: Priority_}[]>(() => [
        {
            label: "High",
            value: "high"
        },
        {
            label: "Medium",
            value: "medium"
        },
        {
            label: "Low",
            value: "low"
        }
    ], []);
    const taskPropData = useMemo<{label: string, value: "milestone" | "deliverable"}[]>(() => [
        {
            label: "Deliverable",
            value: "deliverable",
        },
        {
            label: "Milestone",
            value: "milestone"
        }
    ], []);
    const availableProjectsData = useMemo<{label: string, value: string}[]>(() => [
        {
            label: "Assign to myself",
            value: "me"
        }
    ], []);
    const [isAssignToMyself, setIsAssignToMyself] = useState<boolean>(false);
    const [createTaskFormData, setCreateTaskFormData] = useState<TaskFormFieldData_>({
        name: "",
        description: "",
        start: "",
        finish: "",
        priority: "",
        type: "",
        project: ""
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const name = e.target.name;
        const type = e.target.type;

        const value = () => {
            switch (type) {
                case "checkbox":
                    return (e.target as HTMLInputElement).checked;
                default:
                    return e.target.value;
            }
        };

        setCreateTaskFormData((prevTaskData) => {
            return {
                ...prevTaskData,
                [name]: value()
            }
        });

        getTaskFormData && getTaskFormData(createTaskFormData);
    };

    return (
        <form className={styles.ctf_form_wrapper}>
            <div className={styles.ctf_form_col}>
                <div className={styles.ctf_form_field}>
                    <label>Task&nbsp;Name</label>
                    <InputDiv type={`text`} placeholder={""} onChange={handleChange} variant={"primary"} inputArgs={{name: "name"}} />
                </div>
                <div className={`${styles.ctf_form_field} ${styles.textarea_exception}`}>
                    <label>Description</label>
                    <textarea name="description" onChange={handleChange}></textarea>
                </div>
                <div className={styles.ctf_form_field}>
                    <input type={`checkbox`} onChange={(e) => {setIsAssignToMyself(e.target.checked), isAssignedToMyself(e)}} />
                    <label style={{marginLeft: "6px"}}>Assign Task to myself</label>
                </div>
            </div>
            <div className={styles.ctf_form_col}>
                <div className={styles.ctf_form_field}>
                    <label>Planned&nbsp;Start</label>
                    <InputDiv type={`date`} placeholder={""} onChange={handleChange} variant={"primary"} inputArgs={{name: "start"}} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Planned&nbsp;Finish</label>
                    <InputDiv type={`date`} placeholder={""} onChange={handleChange} variant={"primary"} inputArgs={{name: "finish"}} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Priority</label>
                    <InputSelect options={priorityOptData} onChange={handleChange} name={"priority"} />
                </div>
                {/* <div className={styles.ctf_form_field}>
                    <label>Duration</label>
                    <InputDiv type={`text`} placeholder={""} onChange={handleChange} variant={"primary"} />
                </div> */}
                <div className={styles.ctf_form_field}>
                    <label>Task&nbsp;Property</label>
                    <InputSelect options={taskPropData} onChange={handleChange} name={"type"} />
                </div>
                {/* Select field for choosing the project to be assigned the tasks */}
                {
                    isAssignToMyself ? 
                        null 
                        :
                        <div className={styles.ctf_form_field}>
                            <label>Project</label>
                            {/* fetch available projects from backed for choosing */}
                            <InputSelect options={availableProjectsData} onChange={handleChange} name={"project"} />
                        </div>
                }
            </div>
        </form>
    )
}