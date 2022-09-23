import React from "react";
import styles from "../../styles/pages/login.module.scss";

interface FormContainer_Props {
    form: React.ReactNode | JSX.Element
}

export const FormContainer = ({ form }: FormContainer_Props): JSX.Element => {
    return (
        <div className={styles.login_form_cont}>
            {form}
        </div>
    )
}