import { useEffect, useMemo, useState, CSSProperties } from "react";
import styles from "../../styles/components/layout/projectsOverview.module.scss";
import {
  IconBtn,
  Table,
  HealthStatusWidget,
  ProfileIcon,
  ProfileIconRibbon,
} from "../reusable";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import MockTableData from "../../mock/tableDataProjectOverView.json";
import MockUsers from "../../mock/users.json";
import { upperCaseFirstSentence } from "../../utils";
import { useProjectStore, useRenderByID } from "../../hooks";
import { ProjectHealthStatus, projectRes } from "../../types";
import { ColumnHelper } from "@tanstack/react-table";

interface ProjectsOverview_Props {
  children?: React.ReactNode;
}

const staticStyles: CSSProperties = {
  width: "100px",
};

export const ProjectsOverview = ({ children }: ProjectsOverview_Props) => {
  const { projects } = useProjectStore();
  const tableData = useMemo(() => {
    return [...MockTableData];
  }, []);
  const userMockData = useMemo(() => [...MockUsers], []);
  const { addComponent } = useRenderByID();
  const [sampleUsers, setSampleUsers] = useState<
    {
      uid: string;
      profilePicURL: string;
    }[]
  >(userMockData);
  const tableHeaders = useMemo(
    () =>
      [
        "id",
        "project_name",
        "project_type",
        "health_status",
        "team",
        "start",
        "finish_date",
        "progress",
      ].map((header) => upperCaseFirstSentence(header, "_")),
    []
  );
  const tableSortedData = projects
    .map((pjct: projectRes) => {
      // add components to the component repo for rendering by ID
      const pjctID = pjct.pid;
      const { compID, fullID } = addComponent(
        pjctID,
        <ProfileIconRibbon
          users={sampleUsers}
          wrapperDivProps={{ style: staticStyles }}
        />
      );

      return Object.create({ ...pjct, fullID: fullID }) as projectRes & {
        fullID: string;
      };
    })
    .map((pjct: projectRes & { fullID: string }, index: number) => [
      `${index + 1}`,
      pjct.name,
      pjct.stage,
      `__component@health_status_${pjct.info.status ?? "active"}`,
      pjct.fullID,
      pjct.info.created.time,
      pjct.info.expiry.time,
      `50%`,
    ]);

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
        <Table
          tableConfig={{ headers: tableHeaders, data: tableSortedData }}
          emptyMessage={"No Projects Found"}
        />
      </div>
    </div>
  );
};
