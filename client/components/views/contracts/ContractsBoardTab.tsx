import React, { useMemo } from "react";
import styles from "../../../styles/views/project/projectsBoard.module.scss";
import { ProjectsSummaryBoard, InputSelect, RegularBtn, IconBtn, ProjectBoardCard } from "../../reusable";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useModal, useContextMenu } from "../../../hooks";
import { CreateTaskFormWithAssignees } from "../../forms";

export const ContractsBoardTab = () => {
    const { modal, openModal } = useModal();
    const { openAtCursor } = useContextMenu();

    function openCreateProjectModalForm() {
        openModal(<CreateTaskFormWithAssignees />)
    }

    const contractNavOptions = useMemo(() => [
        <button key={1}>Open Contracts</button>,
        <button key={2}>Hide Status</button>
    ], [])

    return (
        <div className={styles.prb_content}>
            <div className={styles.prb_header}>
                <div className={styles.prb_title_block}>
                    <h2>My Contracts</h2>
                </div>
            </div>
            <div className={styles.prb_nav_wrapper}>
                <div className={styles.prb_nav}>
                    <div className={styles.prb_nav_col}>
                        <InputSelect withIcon={{status: true, icon: <FiFilter />}} options={[]} />
                    </div>
                    <div className={styles.prb_nav_col}>
                        <span>
                            <label htmlFor="">Sort By:</label>
                            <InputSelect options={[{label: "Date", value: "date"}]} />
                        </span>
                        <RegularBtn label={"Add Contract"} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"outlined"} data-elm-type={"btn-add"} onClick={(e) => {openCreateProjectModalForm()}} />
                        <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} onClick={(e) => {openAtCursor(e, contractNavOptions)}} />
                    </div>
                </div>
            </div>
            <div className={styles.prb_boards_wrapper}>
                <ProjectsSummaryBoard title={"Approving"} info={"1 Contract"} boardData={[{
                    component: <ProjectBoardCard title={"Brainstorming"} priority={"low"} description={"Brainstorming brings team members' diverse experience into play. "} />
                }]} />
                <ProjectsSummaryBoard title={"Pending"} boardData={[]} />
                <ProjectsSummaryBoard title={"Signed"} info={"1 Contract"} boardData={[{
                    component: <ProjectBoardCard title={"Braining"} priority={"high"} description={"Brainstorming brings team members' diverse experience into play. "} />
                }]} />
            </div>
        </div>
    )
}