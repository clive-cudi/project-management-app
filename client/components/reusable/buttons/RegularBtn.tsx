import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "../../../styles/components/reusable/buttons/buttons.module.scss";

interface RegularBtn_Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: "text" | "contained" | "outlined"
    withIcon?: {
        status: boolean,
        icon: JSX.Element | React.ReactNode
        orientation: "start" | "end"
    }
    // other?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

// extend html button types with RegularBtn_Props


export const RegularBtn = ({label, variant = "contained", withIcon, ...other}: RegularBtn_Props): JSX.Element => {
    return (
        <button className={`${styles.regular_btn} ${styles[`regular_btn_${variant}`]}`} {...other}>
            {withIcon?.status === true && withIcon.orientation === "start" && <span>{withIcon.icon}</span>}
            {label}
            {withIcon?.status === true && withIcon.orientation === "end" && <span>{withIcon.icon}</span>}
        </button>
    )
};