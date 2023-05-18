import React, { useState, ChangeEvent } from "react";
import styles from "../../styles/components/forms/createProjectForm.module.scss";
import { InputDiv, RegularBtn, DropdownMultiOptionChoosenWidget, IconBtn } from "../reusable";
import { useGlobalLoading, useProjectStore, useContextMenu } from "../../hooks";
import { BsPlus } from "react-icons/bs";
import { projectRes } from "../../types";
import { getUniqueListBy } from "../../utils";


export const CreateClientForm = (): JSX.Element => {
    const [newClientData, setNewClientData] = useState({});
    const { startLoading, stopLoading, globalLoading } = useGlobalLoading();
    const { projects } = useProjectStore();
    const { openAtCursor } = useContextMenu();
    const [chosenProjects, setChosenProjects] = useState<projectRes[]>([]);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) {
        const name = e.target.name;
        const type = e.target.type;
        
        // console.log(name);
        // console.log(typeof e.target.value)
    
        const value = () => {
          switch (type) {
            case "checkbox":
              return (e.target as HTMLInputElement).checked;
            default:
              return e.target.value;
          }
        };
    
        setNewClientData((prevData) => ({
          ...prevData,
          [name]: value(),
        }));
      }

      function addProjectToChoiceList(prjct: projectRes) {
        if (!chosenProjects?.some((pj__) => pj__.pid === prjct.pid)) {
            // add to list
            setChosenProjects((prevChosen) => getUniqueListBy([...prevChosen, prjct], "pid"))
        }
      }

      function submitNewClient() {
        // create new client
      }

      function removeFromChoiceList(prjct: { projectID: string | number; name: string | number }) {
        // remove from project list
        setChosenProjects((prevChosen) => [...prevChosen].filter((val) => val.pid !== prjct.projectID))
      }

    return (
        <form className={styles.cpf_form} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>First&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={`primary`} inputArgs={{name: 'firstName'}} onChange={handleChange} />
                </div>
                <div className={styles.cpf_form_field}>
                    <span>Last&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={`primary`} inputArgs={{name: 'lastName'}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Title</span>
                    <InputDiv type={`text`} placeholder={``} variant={`primary`} inputArgs={{name: 'title'}} onChange={handleChange} />
                </div>
                <div className={styles.cpf_form_field}>
                    <span>Email</span>
                    <InputDiv type={`email`} placeholder={``} variant={`primary`} inputArgs={{name: 'email'}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Business&nbsp;Name</span>
                    <InputDiv type={`text`} placeholder={``} variant={`primary`} inputArgs={{name: 'businessName'}} onChange={handleChange} />
                </div>
                <div className={styles.cpf_form_field}>
                    <span>Mobile&nbsp;Number</span>
                    <InputDiv type={`tel`} placeholder={``} variant={`primary`} inputArgs={{name: 'mobile'}} onChange={handleChange} />
                </div>
            </div>
            <div className={styles.cpf_form_strip}>
                <div className={styles.cpf_form_field}>
                    <span>Projects&nbsp;</span>
                    <div className={styles.cpf_multi_option_input}>
                        {chosenProjects?.map((choosen_project, index) => (
                        <DropdownMultiOptionChoosenWidget
                            key={index}
                            label={choosen_project.name}
                            value={choosen_project.pid}
                            onCancel={(e, val) => {removeFromChoiceList({projectID: val.value, name: val.label})}}
                        />
                        ))}
                    </div>
                    <IconBtn
                        id={"add_client_btn"}
                        icon={<BsPlus />}
                        variant={"util"}
                        data-elm-type={"icon-btn-add"}
                        onClick={(e) => {
                        openAtCursor(
                            e,
                            (projects?.map((available_client, ix) => (
                            <button
                                key={ix}
                                onClick={() => {
                                addProjectToChoiceList(available_client);
                                }}
                            >
                                {available_client.name}
                            </button>
                            )).concat(<button onClick={() => {}}>Add new Client</button>) ?? [])
                        );
                        }}
                    />
                </div>
            </div>
            <div
                className={`${styles.cpf_form_strip} ${styles.cpf_form_submit_exception}`}
            >
                <RegularBtn type={"submit"} label={`Create Client`} isLoading={{status: globalLoading.isLoading ?? false}} onClick={() => {submitNewClient()}} />
            </div>
        </form>
    )
}