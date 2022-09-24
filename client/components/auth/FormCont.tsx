import React from "react";
import styles from "../../styles/pages/login.module.scss";
import Link from "next/link";

interface FormContainer_Props {
    form: React.ReactNode | JSX.Element,
    altLink?: {
        link: string
        label: string
    }
}

export const FormContainer = ({ form, altLink }: FormContainer_Props): JSX.Element => {
    return (
        <div className={styles.login_form_cont}>
            {form}
            {
                altLink && <Link href={altLink.link} >{altLink.label}</Link>
            }
        </div>
    )
}