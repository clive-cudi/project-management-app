import React, { HTMLInputTypeAttribute, useState } from "react";
import styles from "../../../styles/components/reusable/modals/inputModal.module.scss";
import { InputDiv } from "../inputs";
import { RegularBtn } from "../buttons";

interface InputModal_Props {
    inputType: HTMLInputTypeAttribute,
    // submitOnClick: (e, value) => void
    submitOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value?: string) => void
    /**
     * multifield?: {
     *      inputTypes: string[],
     *      submitOnClick: (e, value: {inputIndex: number, type: string[], value: string}[])
     * }
     */
    placeholder?: string
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputModal = ({inputType, submitOnClick, placeholder, onChangeHandler}: InputModal_Props): JSX.Element => {
    const [data, setData] = useState({
        email: ""
    });

    return (
        <div className={styles.inputModal_wrapper}>
            <div className={styles.inputModal_content}>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <InputDiv type={inputType} placeholder={placeholder ?? "Enter Email ..."} variant={"primary"} onChange={(e)=> {
                        onChangeHandler && onChangeHandler(e);
                        setData((prev)=> {
                            return {
                                ...prev,
                                email: e.target.value
                            }
                        })
                    }} />
                    <RegularBtn type="submit" label="Submit" variant="gradient" onClick={(e)=> {submitOnClick(e, data.email)}} />
                </form>
            </div>
        </div>
    )
}