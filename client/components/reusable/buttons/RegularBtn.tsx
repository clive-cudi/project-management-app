import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "../../../styles/components/reusable/buttons/buttons.module.scss";
import { AiOutlineLoading } from "react-icons/ai";

interface RegularBtn_Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    variant?: "text" | "contained" | "outlined" | "gradient"
    withIcon?: {
        status: boolean,
        icon: JSX.Element | React.ReactNode
        orientation: "start" | "end"
    }
    // other?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    isLoading?: {
        status: boolean,
        iconAlt?: JSX.Element | React.ReactNode
    }
    className?: string
}

// extend html button types with RegularBtn_Props


export const RegularBtn = ({label, variant = "contained", withIcon, isLoading, className, ...other}: RegularBtn_Props): JSX.Element => {
    return (
        <button className={`${styles.regular_btn} ${styles[`regular_btn_${variant}`]} ${className ?? ""}`} disabled={isLoading?.status} {...other}>
            {withIcon?.status === true && withIcon.orientation === "start" && <span>{withIcon.icon}</span>}
            {isLoading?.status === true ? <span className={styles.regular_btn_loading_icon}>{isLoading.iconAlt ?? <AiOutlineLoading />}</span> : label}
            {withIcon?.status === true && withIcon.orientation === "end" && <span>{withIcon.icon}</span>}
        </button>
    )
};