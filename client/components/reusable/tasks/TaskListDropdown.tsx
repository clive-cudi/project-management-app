import React, { useState } from "react";
import styles from "../../../styles/components/reusable/tasks/index_tasks.module.scss";
import { IconBtn } from "../buttons";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface TaskListDropdown_Props {
    title: string,
    dropComponent: JSX.Element
}

export const TaskListDropdown = ({title, dropComponent}: TaskListDropdown_Props): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    function toggleCollapsed() {
        if (isCollapsed === true) {
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    }

    return (
        <div className={styles.tlst_drpdwn}>
            <div className={styles.tlst_drpdwn_title_block} onClick={() => {toggleCollapsed()}}>
                <IconBtn icon={isCollapsed === true ? <BsChevronUp /> : <BsChevronDown />} variant={"text"} onClick={(e) => {e.stopPropagation();toggleCollapsed()}} />
                <h3>{title}</h3>
            </div>
            <div className={`${styles.tlst_drpdwn_content} ${styles[`tlst_drpdwn_content_collapsed_${isCollapsed}`]}`}>
                {/* dropComponent here */}
                {dropComponent}
            </div>
        </div>
    )
}