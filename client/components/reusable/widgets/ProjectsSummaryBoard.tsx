import { RegularBtn } from "../buttons";
import { BsPlus } from "react-icons/bs";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { useModal } from "../../../hooks";
import { ModalFormWrapper } from "../../layout";
import { CreateProjectForm } from "../../forms";

interface ProjectSummaryBoard_Props {
    title: string
    info?: string
    boardData?: {
        component: JSX.Element | React.ReactNode
    }[]
}

export const ProjectsSummaryBoard = ({ title, info, boardData}: ProjectSummaryBoard_Props): JSX.Element => {
    const { openModal } = useModal();

    function openCreateProjectModalForm() {
        openModal(<ModalFormWrapper form={<CreateProjectForm />} title={`Create Project`} />)
    }

    return (
        <div className={styles.psb_wrapper}>
            <div className={styles.psb_header}>
                <div className={styles.psb_header_title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.psb_header_info}>
                    {info ? <span></span> : null}
                    <h5>{info ?? null}</h5>
                </div>
            </div>
            <div className={`${styles.psb_content} ${boardData && boardData?.length > 0 ? "" : styles.board_empty}`}>
                {
                    boardData && boardData.length > 0 ? boardData?.map((widget) => widget.component) : <p>No projects in this stage</p>
                }
            </div>
            {
                boardData && boardData.length > 0 ? null : <RegularBtn label={"Add Project"} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"outlined"} data-elm-type={"btn-add"} onClick={() => {openCreateProjectModalForm()}} />
            }
        </div>
    )
}