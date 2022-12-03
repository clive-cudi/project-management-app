import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "../../../styles/components/reusable/inputs/input.module.scss";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    value: string,
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>, label: string) => void
    disabled?: boolean
}

export const RadioInput = ({ label, value, disabled, onChangeHandler, ...radioProps }: RadioInputProps): JSX.Element => {
    return (
        <span className={styles.radio_wrapper}>
            <label htmlFor={`radio_${label}`}>{label}</label>
            <input type={"radio"} id={`radio_${label}`} value={value} disabled={disabled} onChange={(e) => {onChangeHandler && onChangeHandler(e, label);}} {...radioProps} />
        </span>
    )
}