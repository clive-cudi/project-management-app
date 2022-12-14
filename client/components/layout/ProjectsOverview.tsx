import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/components/layout/projectsOverview.module.scss";
import { IconBtn, Table, HealthStatusWidget, ProfileIcon, ProfileIconRibbon } from "../reusable";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import TableData from "../../mock/tableDataProjectOverView.json";
import { upperCaseFirstSentence } from "../../utils";
import { useProjectStore, useRenderByID } from "../../hooks";
import { ProjectHealthStatus, projectRes } from "../../types";
import { ColumnHelper } from "@tanstack/react-table";


interface ProjectsOverview_Props {
    children?: React.ReactNode
}

export const ProjectsOverview = ({children}: ProjectsOverview_Props) => {
    const { projects } = useProjectStore();
    const tableData = useMemo(() => {
        return [...TableData]
    }, []);
    const { addComponent } = useRenderByID();
    const [sampleUsers, setSampleUsers] = useState<{
        uid: string,
        profilePicURL: string
    }[]>([
        {
            uid: "user_one",
            profilePicURL: "https://source.unsplash.com/random/"
        },
        {
            uid: "user_two",
            profilePicURL: "https://source.unsplash.com/random/"
        },
        {
            uid: "user_three",
            profilePicURL: "https://source.unsplash.com/random/"
        },
        {
            uid: "user_four",
            profilePicURL: "https://source.unsplash.com/random/"
        },
        {
            uid: "user_five",
            profilePicURL: "https://source.unsplash.com/random/"
        },
        {
            uid: "user_six",
            profilePicURL: "https://source.unsplash.com/random/"
        }
    ]);
    const tableHeaders = useMemo(() => ["id", "project_name", "project_type", "health_status", "team", "start", "finish_date", "progress"].map((header)=> upperCaseFirstSentence(header, "_")), []);
    const tableSortedData = projects.map((pjct, index) => {
        // add components to the component repo for rendering by ID
        const pjctID = pjct.pid;
        console.log(pjct.contributors.individuals);
        const { compID, fullID } = addComponent(pjctID, <ProfileIconRibbon users={sampleUsers} />);

        return Object.create({...pjct, fullID: fullID}) as projectRes & {fullID: string};
    }).map((pjct: projectRes & {fullID: string}, index) => [`${index+1}`, pjct.name, pjct.stage, `__component@health_status_${pjct.info.status ?? "active"}`, pjct.fullID, pjct.info.created.time, pjct.info.expiry.time, `50%`]);

    useEffect(() => {
        console.log("Projects Overview");
    }, [])

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