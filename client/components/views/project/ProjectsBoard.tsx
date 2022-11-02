import styles from "../../../styles/views/project/projectsBoard.module.scss";
import { ProjectsSummaryBoard, InputSelect, RegularBtn, IconBtn, ProjectBoardCard } from "../../reusable";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

export const ProjectsBoard = () => {
    return (
        <div className={styles.prb_content}>
            <div className={styles.prb_header}>
                <div className={styles.prb_title_block}>
                    <h2>My Projects</h2>
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
                        <RegularBtn label={"Add Project"} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"outlined"} data-elm-type={"btn-add"} />
                        <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} onClick={() => {}} />
                    </div>
                </div>
            </div>
            <div className={styles.prb_boards_wrapper}>
                <ProjectsSummaryBoard title={"New Projects"} info={"1 Project"} boardData={[{
                    component: <ProjectBoardCard title={"Brainstorming"} priority={"low"} description={"Brainstorming brings team members' diverse experience into play. "} />
                }]} />
            </div>
        </div>
    )
}