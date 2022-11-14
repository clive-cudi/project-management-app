import { HomeTab } from "../../components/views/homepageTabs/Hometab";
import { MessagesTab } from "../../components/views/homepageTabs/MessagesTab";
import { WorkSpaceTab } from "../../components/views/homepageTabs/WorkSpaceTab";
import { MembersTab } from "../../components/views/homepageTabs/MembersTab";
import { SettingsTab } from "../../components/views/homepageTabs/SettingsTab";
import { ProjectDashBoardTab, ProjectDetailsTab, ProjectSummaryTab, ProjectsBoard } from "../../components/views/project";
import { TasksOverviewTab, TasksBoard, TaskListTab, GanttChartTab } from "../../components/views/tasks";
import { CreateTaskFormWithAssignees } from "../../components";
import { TabRenderCtxTypes } from "../../context";

export const Tabs: TabRenderCtxTypes[] = [
    {
        label: "home",
        component: <HomeTab />
    },
    {
        label: "messages",
        component: <MessagesTab />
    },
    {
        label: "workspace",
        component: <WorkSpaceTab />
    },
    {
        label: "members",
        component: <MembersTab />
    },
    {
        label: "settings",
        component: <SettingsTab />
    },
    {
        label: "project_board",
        component: <ProjectsBoard />
    },
    {
        label: "project_dashboard",
        component: <ProjectDashBoardTab />
    },
    {
        label: "project_details",
        component: <ProjectDetailsTab />
    },
    {
        label: "project_summary",
        component: <ProjectSummaryTab />
    },
    {
        label: "overview",
        component: <TasksOverviewTab />
    },
    {
        label: "tasks_board",
        component: <TasksBoard />
    },
    {
        label: "task_list",
        component: <TaskListTab />
    },
    {
        label: "gantt_chart",
        component: <GanttChartTab />
    },
    {
        label: "test",
        component: <CreateTaskFormWithAssignees/>
    }
];