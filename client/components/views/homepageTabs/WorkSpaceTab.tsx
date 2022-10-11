import { useMemo } from "react";
import styles from "../../../styles/views/homePageTabs/workspacetab.module.scss";
import { RegularBtn } from "../../reusable";
import { Table } from "../../reusable";

export const WorkSpaceTab = ({}) => {
    const workSpaceTableHeaders = useMemo(()=> ["No.", "Name", "Type", "Health", "Priority" ], []);
    const workSpaceData = useMemo(()=> {
        return [
            ["1", "Mobile App", "Project", "On Plan", "Normal"],
            ["2", "Read", "Program", "Needs Attention", "Normal"]
        ]
    }, [])

    return (
        <div className={styles.wst_content}>
            <div className={styles.wst_header}>
                <h4>Add a new workspace</h4>
                <RegularBtn label="Add WorkSpace" />
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