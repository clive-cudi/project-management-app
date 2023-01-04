import { useMemo } from "react";
import styles from "../../styles/components/layout/projectsOverview.module.scss";
import { IconBtn, Table, HealthStatusWidget } from "../reusable";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import TableData from "../../mock/tableDataProjectOverView.json";
import { upperCaseFirstSentence } from "../../utils";
import { useProjectStore } from "../../hooks";
import { ProjectHealthStatus } from "../../types";

interface ProjectsOverview_Props {
    children?: React.ReactNode
}

export const ProjectsOverview = ({children}: ProjectsOverview_Props) => {
    const { projects } = useProjectStore();
    const tableData = useMemo(() => {
        return [...TableData]
    }, []);
    const tableHeaders = useMemo(() => ["id", "project_name", "project_type", "health_status", "team", "start", "finish_date", "progress"].map((header)=> upperCaseFirstSentence(header, "_")), []);
    const tableSortedData = projects.map((pjct, index) => [`${index+1}`, pjct.name, pjct.stage, `__component@health_status_${pjct.info.status ?? "active"}`, "__component@profile_icon", pjct.info.created.time, pjct.info.expiry.time, `50%`]);

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
                <Table tableConfig={{headers: tableHeaders, data: tableSortedData}} emptyMessage={"No Projects Found"} />
            </div>
        </div>
    )
}