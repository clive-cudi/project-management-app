import React from "react";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { CgSpinnerAlt } from "react-icons/cg";

interface Spinner_Props {
    altIcon?: JSX.Element | React.ReactNode
    variant?: "bare" | "util"
}

export const Spinner = ({ altIcon, variant}: Spinner_Props): JSX.Element => {
    return (
        <span className={`${styles.spinner_wrapper} ${styles[`spinner_${variant}`]}`}>
            <span>
                {altIcon ? altIcon : <CgSpinnerAlt />}
            </span>
        </span>
    )
}