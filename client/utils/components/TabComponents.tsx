import { TabRenderCtxTypes } from "../../context";
import {
  HomeTab,
  MessagesTab,
  WorkSpaceTab,
  MembersTab,
  SettingsTab,
  ProjectsBoard,
  ProjectDashBoardTab,
  ProjectDetailsTab,
  ProjectSummaryTab,
  TasksOverviewTab,
  TasksBoard,
  TaskListTab,
  GanttChartTab,
  MyContractsTab,
  AddContractTab,
  SearchContractsTab,
  ContractsBoardTab,
  TestTab,
} from "../../components";

export const Tabs: TabRenderCtxTypes[] = [
  {
    label: "home",
    component: () => <HomeTab />,
  },
  {
    label: "messages",
    component: () => <MessagesTab />,
  },
  {
    label: "workspace",
    component: () => <WorkSpaceTab />,
  },
  {
    label: "members",
    component: () => <MembersTab />,
  },
  {
    label: "settings",
    component: () => <SettingsTab />,
  },
  {
    label: "project_board",
    component: () => <ProjectsBoard />,
  },
  {
    label: "project_dashboard",
    component: () => <ProjectDashBoardTab />,
  },
  {
    label: "project_details",
    component: () => <ProjectDetailsTab />,
  },
  {
    label: "project_summary",
    component: () => <ProjectSummaryTab />,
  },
  {
    label: "overview",
    component: () => <TasksOverviewTab />,
  },
  {
    label: "tasks_board",
    component: () => <TasksBoard />,
  },
  {
    label: "task_list",
    component: () => <TaskListTab />,
  },
  {
    label: "gantt_chart",
    component: () => <GanttChartTab />,
  },
  {
    label: "my_contracts",
    component: () => <MyContractsTab />,
  },
  {
    label: "add_contract",
    component: () => <AddContractTab />,
  },
  {
    label: "search_contracts",
    component: () => <SearchContractsTab />,
  },
  {
    label: "contracts_board",
    component: () => <ContractsBoardTab />,
  },
  {
    label: "test",
    component: () => <TestTab />,
  },
];
