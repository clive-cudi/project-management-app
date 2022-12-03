import { useState } from "react";
import { RadioGroupInput } from "../inputs";
import styles from "../../../styles/components/reusable/modals/markAs.module.scss";
import { RegularBtn } from "../buttons";
import { useModal } from "../../../hooks";

interface ChangePriorityModal_Props {
    options: {
        label: string,
        value: string
    }[]
    title?: string
}

export const ChangePriorityModal = ({ options, title }: ChangePriorityModal_Props): JSX.Element => {
    const [option, setOption] = useState<{label: string, value: string}>({
        label: "",
        value: ""
    });
    const { closeModal } = useModal();

    return (
        <div className={styles.masm_wrapper}>
            {title ? <h3>{title}</h3> : null}
            <div className={styles.masm_content}>
                <RadioGroupInput name={"change_priority"} title={"Choose an option:"} options={options} onChangeHandler={(e, lbl) => {setOption({label: lbl, value: e.target.value})}} />
            </div>
            <div className={styles.submit_strip}>
                <RegularBtn label={option.label.length > 0 ? `Change to ${option.label}` : `Change`} variant={"gradient"} />
                <RegularBtn label={"Cancel"} variant="outlined" onClick={() => {closeModal()}} />
            </div>
        </div>
    )
}