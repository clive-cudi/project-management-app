import { upperCaseFirstSentence } from "../../../utils";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { DeadLineTimer, DeadLineTimer_Props } from "../general";

interface ProjectDeadlineTimer_Props {
    projectName: string
}

export const ProjectDeadlineTimer = ({ projectName, countDownStart }: ProjectDeadlineTimer_Props & DeadLineTimer_Props) => {
    return (
        <div className={styles.pdlt_wrapper}>
            <div className={styles.pdlt_header_wrapper}>
                <h3>Project Name: {upperCaseFirstSentence(projectName)}</h3>
            </div>
            <div className={styles.pdlt_timer_wrapper}>
                <DeadLineTimer countDownStart={countDownStart} />
            </div>
        </div>
    )
}