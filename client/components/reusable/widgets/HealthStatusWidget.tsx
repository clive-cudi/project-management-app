import React from "react";
import { ProjectHealthStatus } from "../../../types";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";

interface HealthStatusWidget_Props {
    status: ProjectHealthStatus
    onClick?: () => void
    custom?: {
        status: string
        color: string
    }
    className?: string
}

export const HealthStatusWidget = ({ status, onClick, custom, className }: HealthStatusWidget_Props): JSX.Element => {
    return (
        <span className={`${styles.health_status_widget} ${styles[`health_status_custom_${custom?.status}`]} ${className ?? ""}`} data-elm-type={"health-status-indicator"}></span>
    )
}