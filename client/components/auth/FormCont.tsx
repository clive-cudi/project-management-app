import React from "react";
import styles from "../../styles/pages/login.module.scss";
import Link from "next/link";

interface FormContainer_Props {
    form: React.ReactNode | JSX.Element,
    altLink?: {
        link: string
        label: string
    }
    socials?: {
        enabled: boolean
        providerTriggerElms: JSX.Element[] 
    }
}

export const FormContainer = ({ form, altLink, socials }: FormContainer_Props): JSX.Element => {
    return (
        <div className={styles.login_form_cont}>
            {form}
            {
                altLink && <Link href={altLink.link} >{altLink.label}</Link>
            }
            {
                socials?.enabled === true ? <div className={styles.socials_auth_wrapper}><h4>Or</h4>{socials.providerTriggerElms.map((provider) => provider)}</div> : null
            }
        </div>
    )
}