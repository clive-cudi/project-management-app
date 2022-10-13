import { useMemo } from "react";
import styles from "../../../styles/views/homePageTabs/workspacetab.module.scss";
import { RegularBtn } from "../../reusable";
import { Table } from "../../reusable";
import { MdOutlineAddBox } from "react-icons/md";
import { useModal } from "../../../hooks";
import { ModalFormWrapper } from "../../layout";
import { AddWorkSpaceForm } from "../../forms";

export const WorkSpaceTab = ({}) => {
    const workSpaceTableHeaders = useMemo(()=> ["No.", "Name", "Type", "Health", "Priority" ], []);
    const workSpaceData = useMemo(()=> {
        return [
            ["1", "Mobile App", "Project", "On Plan", "Normal"],
            ["2", "Read", "Program", "Needs Attention", "Normal"]
        ]
    }, []);
    const { openModal } = useModal();

    return (
        <div className={styles.wst_content}>
            <div className={styles.wst_header}>
                <h4>Add a new workspace</h4>
                <RegularBtn label="Add WorkSpace" withIcon={{status: true, icon: <MdOutlineAddBox />, orientation: "end"}} onClick={()=>{
                    openModal(<ModalFormWrapper form={<AddWorkSpaceForm />} title={`Create Workspace`} />)
                }} />
            </div>
            <div className={styles.wst_list}>
                <h4>Your Workspaces.</h4>
                <Table tableConfig={{headers: workSpaceTableHeaders, data: workSpaceData}} clickableRows={true} onClickHandler={(e, rowIndex)=> {
                    console.log("Row " + rowIndex + " was clicked!!")
                }} />
            </div>
        </div>
    )
}