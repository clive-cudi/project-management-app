import { useMemo } from "react";
import styles from "../../styles/components/forms/createProjectForm.module.scss";
import { InputDiv, InputSelect, RegularBtn } from "../reusable";

export const CreateProjectForm = (): JSX.Element => {
    const projectStageData = useMemo(() => [{label: "New Project", value: "new"}, {label: "Development", value: "development"}, {label: "Launch", value: "launch"}], []);

    return (
        <form className={styles.cpf_form} onSubmit={(e) => {
            e.preventDefault()
        }}>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Project&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} onChange={(e) => {}} />
                </div>
                <div className={styles.cpf_form_field}>
                    <span>Stage</span>
                    <InputSelect options={projectStageData} onChange={(e) => {}} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Client&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} onChange={(e) => {}} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Budget</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} onChange={(e) => {}} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Start&nbsp;Date</span>
                    <InputDiv type={`date`} placeholder={``} variant={"primary"} onChange={(e) => {}} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Closing&nbsp;Date</span>
                    <InputDiv type={`date`} placeholder={``} variant={"primary"} onChange={(e) => {}} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={`${styles.cpf_form_field} ${styles.textarea_exception}`}>
                    <span>Description</span>
                    <textarea></textarea>
                </div>
            </div>
            <div className={`${styles.cpf_form_strip} ${styles.cpf_form_submit_exception}`}>
                <RegularBtn type={"submit"} label={`Save`} onClick={() => {}} />
            </div>
        </form>
    )
}