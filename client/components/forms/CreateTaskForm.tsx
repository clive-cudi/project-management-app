import { useMemo } from "react";
import styles from "../../styles/components/forms/createTaskForm.module.scss";
import { InputDiv, InputSelect } from "../reusable";
import { Priority_ } from "../../types";

export const CreateTaskForm = (): JSX.Element => {
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
    ], [])

    return (
        <form className={styles.ctf_form_wrapper}>
            <div className={styles.ctf_form_col}>
                <div className={styles.ctf_form_field}>
                    <label>Task&nbsp;Name</label>
                    <InputDiv type={`text`} placeholder={""} onChange={() => {}} variant={"primary"} />
                </div>
                <div className={`${styles.ctf_form_field} ${styles.textarea_exception}`}>
                    <label>Description</label>
                    <textarea></textarea>
                </div>
            </div>
            <div className={styles.ctf_form_col}>
                <div className={styles.ctf_form_field}>
                    <label>Planned&nbsp;Start</label>
                    <InputDiv type={`text`} placeholder={""} onChange={() => {}} variant={"primary"} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Planned&nbsp;Finish</label>
                    <InputDiv type={`text`} placeholder={""} onChange={() => {}} variant={"primary"} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Priority</label>
                    <InputSelect options={priorityOptData} onChange={() => {}} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Duration</label>
                    <InputDiv type={`text`} placeholder={""} onChange={() => {}} variant={"primary"} />
                </div>
                <div className={styles.ctf_form_field}>
                    <label>Task&nbsp;Property</label>
                    <InputSelect options={taskPropData} onChange={() => {}} />
                </div>
            </div>
        </form>
    )
}