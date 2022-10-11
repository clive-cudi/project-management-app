import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "../../../styles/components/reusable/inputs/input.module.scss";
import { BsCheck } from "react-icons/bs";

interface InputCheck extends InputHTMLAttributes<HTMLInputElement>{
    mod?: {
        icon: JSX.Element | ReactNode
    }
    defaultchecked?: boolean
}

export const InputCheck = ({mod, className, defaultChecked = false, ...checkboxProps}: InputCheck) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

    function toggleChecked(): void {
        if (isChecked === true) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }

    return (
        <span className={`${styles.input_check} ${styles[`checked_${isChecked}`]} ${className}`} onClick={toggleChecked}>
            <input type={"checkbox"} checked={isChecked} {...checkboxProps} />
            <span>
                {isChecked === true && (mod?.icon ?? <BsCheck />)}
            </span>
        </span>
    )
}