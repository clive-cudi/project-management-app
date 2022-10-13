import React, { HTMLInputTypeAttribute } from "react";
import styles from "../../../styles/components/reusable/inputs/input.module.scss";

interface InputDiv_Props {
    type: HTMLInputTypeAttribute
    placeholder?: string
    icon?: JSX.Element | React.ReactNode
    styling?: React.CSSProperties
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputArgs?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

export const InputDiv = ({type, placeholder, icon, styling, onChange, inputArgs}: InputDiv_Props): JSX.Element => {
    return (
        <div className={styles.input_div_wrapper} style={styling} data-elm-type={"input"}>
            {icon && <span>{icon}</span>}
            <input type={type} placeholder={placeholder} onChange={onChange} {...inputArgs} />
        </div>
    )
}