import React, { MouseEvent, useState } from "react";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { upperCaseFirstSentence } from "../../../utils";

export type DropDownoption_ = {
    label: string
    onClickHandler: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    btnProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    hasActiveTabSwitch?: boolean
}

export interface DropDownWidget_Props {
    options: DropDownoption_[]
    currentOpt?: string
    className?: string
}

export const DropDownNavWidget = ({ options, currentOpt, className}: DropDownWidget_Props): JSX.Element => {
    const [activeOption, setActiveOption] = useState<string>(currentOpt ? currentOpt : options[0]?.label);

    return (
        <ul className={`${styles.ddnw_ul} ${className ?? ""}`}>
            {
                options.map((opt, ix) => {
                    return (
                        <li key={ix}>
                            <button onClick={(e) => {
                                opt.onClickHandler(e);
                                opt.hasActiveTabSwitch ? setActiveOption(opt.label) : null
                            }} {...opt.btnProps} className={`${styles[`ddnw_ul_btn_${activeOption === opt.label}`]}`}>
                                {upperCaseFirstSentence(opt.label, "_")}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}