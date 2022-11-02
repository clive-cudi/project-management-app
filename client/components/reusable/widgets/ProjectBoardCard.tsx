import { Badge } from "../general";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { RegularBtn } from "../buttons";
import { BiComment, BiNote } from "react-icons/bi";

interface ProjectBoardCard_Props {
    title: string
    priority: "high" | "medium" | "low"
    description?: string
    participants?: {
        picURL?: string
    }[]
    comments?: {
        number: number
        commentData: {src: string}[]
    }
    noteData?: {
        src: string
        content: string
    }[]
}

export const ProjectBoardCard = ({ title, priority, description, participants, comments, noteData }: ProjectBoardCard_Props): JSX.Element => {
    return (
        <div className={styles.pbc_wrapper}>
            <div className={styles.pbc_header_wrapper}>
                <Badge type={priority} />
                <h4>{title}</h4>
            </div>
            <div className={styles.pbc_info_wrapper}>
                <p>
                    {description}
                </p>
            </div>
            <div className={styles.pbc_footer_wrapper}>
                {/* profileicons */}
                <div className={styles.pbc_footer_col}>
                    <span className={styles.pbc_profiles}></span>
                </div>
                <div className={styles.pbc_footer_col}>
                    <RegularBtn label={`${comments?.number ?? 0} comment${comments?.number !== 1 ? 's' : ''}`} withIcon={{status: true, icon: <BiComment fontSize={20} style={{marginRight: "4px"}} />, orientation: "start"}} variant={"text"} onClick={() => {}} />
                </div>
                <div className={styles.pbc_footer_col}>
                    <RegularBtn label={`${noteData?.length ?? 0} note${noteData?.length !== 1 ? 's' : ''}`} withIcon={{status: true, icon: <BiNote fontSize={20} style={{marginRight: "4px"}} />, orientation: "start"}} variant={"text"} onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}