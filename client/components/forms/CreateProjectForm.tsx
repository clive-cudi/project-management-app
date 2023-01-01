import { useMemo, useState, ChangeEvent } from "react";
import { BsPlus } from "react-icons/bs";
import styles from "../../styles/components/forms/createProjectForm.module.scss";
import { InputDiv, InputSelect, RegularBtn, IconBtn } from "../reusable";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'; 

export const CreateProjectForm = (): JSX.Element => {
    const projectStageData = useMemo(() => [{label: "New Project", value: "new"}, {label: "Development", value: "development"}, {label: "Launch", value: "launch"}], []);
    const [newProjectData, setNewProjectData] = useState({
        name: "",
        stage: "",
        client: "",
        bugdet: "",
        start: "",
        finish: "",
        description: ""
    });
    // Initialize tippy.js

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const name = e.target.name;
        const type = e.target.type;

        const value = () => {
            switch(type) {
                case "checkbox":
                    return (e.target as HTMLInputElement).checked;
                default:
                    return e.target.value;
            }
        }

        setNewProjectData((prevData) => ({
            ...prevData,
            [name]: value()
        }))
    };

    function submitNewProject() {
        const { client, description, ...requiredData} = newProjectData;

        if ([...Object.values(requiredData)].every(Boolean)) {
            console.log("submitting project create")
        }
    }

    return (
        <form className={styles.cpf_form} onSubmit={(e) => {
            e.preventDefault()
        }}>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Project&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} inputArgs={{name: "name"}} onChange={handleChange} />
                </div>
                <div className={styles.cpf_form_field}>
                    <span>Stage</span>
                    <InputSelect options={projectStageData} name={"stage"} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Client&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} inputArgs={{name: "client"}} onChange={handleChange} />
                    {/* fetch clients related to the user for choosing */}
                    {/* if the client doesn't exist in list, the user has to create a new client */}
                    <Tippy content={"Add Client"}>
                        <IconBtn id={"add_client_btn"} icon={<BsPlus />} variant={"util"} data-elm-type={"icon-btn-add"} />
                    </Tippy>
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Budget</span>
                    <InputDiv type={`text`} placeholder={``} variant={"primary"} inputArgs={{name: "budget"}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Start&nbsp;Date</span>
                    <InputDiv type={`date`} placeholder={``} variant={"primary"} inputArgs={{name: "start"}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Closing&nbsp;Date</span>
                    <InputDiv type={`date`} placeholder={``} variant={"primary"} inputArgs={{name: "finish"}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={`${styles.cpf_form_field} ${styles.textarea_exception}`}>
                    <span>Description</span>
                    <textarea name={"description"} onChange={handleChange}></textarea>
                </div>
            </div>
            <div className={`${styles.cpf_form_strip} ${styles.cpf_form_submit_exception}`}>
                <RegularBtn type={"submit"} label={`Save`} onClick={() => {}} />
            </div>
        </form>
    )
}