import { useMemo } from "react";
import styles from "../../styles/components/layout/projectsOverview.module.scss";
import { IconBtn, Table } from "../reusable";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import TableData from "../../mock/tableDataProjectOverView.json";
import { upperCaseFirstSentence } from "../../utils";

interface ProjectsOverview_Props {
    children?: React.ReactNode
}

export const ProjectsOverview = ({children}: ProjectsOverview_Props) => {
    const tableData = useMemo(() => {
        return [...TableData]
    }, [])

    const tableHeaders = tableData[0].headers.map((header)=> upperCaseFirstSentence(header, "_"));
    const tableSortedData = tableData[0].data;

    return (
        <div className={styles.pov_wrapper}>
            <div className={styles.pov_header_wrapper}>
                <div className={styles.pov_title}>
                    <h4>Projects Overview</h4>
                </div>
                <div className={styles.pov_util_wrapper}>
                    <IconBtn icon={<BsFilter />} variant={"outlined"} />
                    <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} />
                </div>
            </div>
            <div className={styles.pov_table_wrapper}>
                <Table tableConfig={{headers: tableHeaders, data: tableSortedData}} />
            </div>
        </div>
    )
}