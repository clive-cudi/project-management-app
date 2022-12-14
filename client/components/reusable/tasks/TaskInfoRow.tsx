import { ChangeEvent } from "react";
import type { Badge_Props } from "../general/Badge";
import styles from "../../../styles/components/reusable/tasks/taskInfoRow.module.scss";
import { Badge } from "../general";
import { InputCheck } from "../inputs";

interface TaskInfoRow_Props {
    label: string,
    badge: Badge_Props
    isChecked?: boolean
    className?: string
    onChangeHandler? (e: ChangeEvent<HTMLInputElement>): void
}

export const TaskInfoRow = ({label, badge, className, onChangeHandler}: TaskInfoRow_Props) => {
    return (
        <div className={`${styles.tir_wrapper} ${className}`}>
            <div className={styles.tir_header}>
                <div className={styles.tir_header_checker}>
                    <InputCheck id={`checkbox_${label.split(" ").join("_")}`} onChange={onChangeHandler} />
                </div>
                <div className={styles.tir_header_title}>
                    <h4>{label}</h4>
                </div>
            </div>
            <div className={styles.tir_info}>
                <Badge type={badge.type} />
            </div>
        </div>
    )
}