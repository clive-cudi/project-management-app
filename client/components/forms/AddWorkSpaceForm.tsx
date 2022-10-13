import styles from "../../styles/components/forms/addWorkSpaceForm.module.scss";
import { InputSelect, InputDiv, RegularBtn } from "../reusable";

export const AddWorkSpaceForm = () => {
    return (
        <form onSubmit={(e)=> {
            e.preventDefault()
        }} className={styles.form}>
            <div className={`${styles.awsf_form_field}`}>
                <label>
                    Work Space Type
                </label>
                <InputSelect options={[]} defaultOption={{label: "Choose WorkSpace Type", value: ""}} />
            </div>
            <div className={`${styles.awsf_form_field}`}>
                <label>
                    Name
                </label>
                <InputDiv type={`text`} placeholder="Enter Project Name..." onChange={(e)=>{}} />
            </div>
            <div className={`${styles.awsf_form_field} ${styles.textarea_exception}`}>
                <label>Description</label>
                <textarea></textarea>
            </div>
            <div className={`${styles.awsf_form_field} ${styles.multi_field}`}>
                <span>
                    <label>Start Date</label>
                    <InputDiv type={`date`} onChange={(e)=>{}} />
                </span>
                <span>
                    <label>Finish Date</label>
                    <InputDiv type={`date`} onChange={(e)=>{}} />
                </span>
            </div>
            <div className={`${styles.awsf_form_field}`}>
                <label>
                    Health
                </label>
                <InputSelect options={[]} defaultOption={{label: "Choose Health ...", value: ""}} />
            </div>
            <div className={`${styles.awsf_form_field}`}>
                <label>
                    Priority
                </label>
                <InputSelect options={[]} defaultOption={{label: "Choose Priority ...", value: ""}} />
            </div>
            <div className={`${styles.awsf_form_field}`}>
                <label>
                    Duration
                </label>
                <InputDiv type={`number`} onChange={()=>{}} placeholder={`Enter Duration ...`} />
            </div>
            <div className={`${styles.awsf_form_field} ${styles.justify_center}`}>
                <RegularBtn label="Done" variant="text" className={styles.awsf_form_submit_btn} />
            </div>
        </form>
    )
}