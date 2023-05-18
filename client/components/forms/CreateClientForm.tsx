import React, { useState, ChangeEvent } from "react";
import styles from "../../styles/components/forms/createProjectForm.module.scss";
import { InputDiv } from "../reusable";

export const CreateClientForm = (): JSX.Element => {
    const [newClientData, setNewClientData] = useState({});

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
        </form>
    )
}