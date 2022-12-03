import { ChangeEvent } from "react";
import styles from "../../../styles/components/reusable/inputs/input.module.scss";
import { RadioInput } from "./RadioInput";

interface RadioGroupInput {
    options: {
        label: string,
        value: string
    }[]
    title?: string
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>, label: string) => void
    name: string
}

export const RadioGroupInput = ({ options, title, onChangeHandler, name }: RadioGroupInput): JSX.Element => {
    function renderOptions(): JSX.Element[] {
        return options.map((opt, ix) => {
            return <RadioInput key={ix} name={name} label={opt.label} value={opt.value} onChangeHandler={(e, lbl) => {onChangeHandler && onChangeHandler(e, lbl)}} />
        })
    }

    return (
        <fieldset className={styles.radio_grp_input_wrapper}>
            {title ? <legend>{title}</legend> : null}
            <div>
                {renderOptions()}
            </div>
        </fieldset>
    )
}