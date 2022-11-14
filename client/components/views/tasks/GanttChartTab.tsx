import styles from "../../../styles/views/tasks/ganttChartTab.module.scss";
import { SearchInput, RegularBtn, InputSelect } from "../../reusable";
import { FiFilter } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";

export const GanttChartTab = (): JSX.Element => {
    return (
        <div className={styles.gct_content}>
            <div className={styles.gct_header}>
                <div className={styles.gct_title_block}>
                    <h2>My Tasks</h2>
                </div>
            </div>
            <div className={styles.gct_nav_wrapper}>
                <div className={styles.gct_nav}>
                    <div className={styles.gct_nav_col}>
                        <SearchInput placeholder={`Search Tasks`} onChange={(e) => {}} />
                    </div>
                    <div className={styles.gct_nav_col}>
                        <InputSelect options={[]} onChange={() => {}} />
                        <RegularBtn label={"Add Task"} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"outlined"} data-elm-type={"btn-add"} onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    )
}