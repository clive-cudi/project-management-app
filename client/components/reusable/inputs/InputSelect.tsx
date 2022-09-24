import React, { SelectHTMLAttributes } from "react";
import styles from "../../../styles/components/reusable/inputs/input.module.scss";

interface InputSelect_Props extends SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        label: string,
        value: string
    }[]
    withIcon?: {
        status: boolean
        icon: React.ReactNode | JSX.Element
    }
}

export const InputSelect = ({options, withIcon, ...otherProps}: InputSelect_Props): JSX.Element => {
    return (
        <div className={`${styles.input_select}`} data-elm-type={"input"}>
            {withIcon?.status === true && <span className={styles.input_select_icon}>{withIcon.icon}</span>}
            <select {...otherProps}>
            {
                options.map((opt, index)=>{
                    return <option key={index} value={opt.value}>{opt.label}</option>
                })
            }
            </select>
        </div>
    )
}