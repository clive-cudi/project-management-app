import React from "react";
import styles from "../../../styles/components/reusable/buttons/buttons.module.scss";

interface IconBtn_Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: React.ReactNode | JSX.Element
    className?: string
    variant?: "text" | "contained" | "outlined" | "util" | "secondary",
    badge?: {
        status: boolean
        num: number
    }
}

export const IconBtn = ({ icon, className, variant, badge, ...utilProps}: IconBtn_Props): JSX.Element => {
    return (
        <button className={`${styles.icon_btn} ${styles[`icon_btn_${variant ?? "contained"}`]} ${className}`} {...utilProps}>
            {icon}
            {badge?.status === true && <span>{badge.num}</span>}
        </button>
    )
}