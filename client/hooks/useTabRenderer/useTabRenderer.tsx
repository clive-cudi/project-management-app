import React, { useContext, useMemo, useState, useEffect } from "react";
import { TabRenderCtx, TabRenderCtx_Props, TabRenderCtxTypes, TabRenderCtxDefaults } from "../../context";
import { HomeTab } from "../../components/views/homepageTabs/Hometab";
import { MessagesTab } from "../../components/views/homepageTabs/MessagesTab";
import { WorkSpaceTab } from "../../components/views/homepageTabs/WorkSpaceTab";
import { MembersTab } from "../../components/views/homepageTabs/MembersTab";
import { SettingsTab } from "../../components/views/homepageTabs/SettingsTab";
import { ProjectDashBoardTab, ProjectDetailsTab, ProjectSummaryTab, ProjectsBoard } from "../../components/views/project";
import { TasksOverviewTab, TasksBoard, TaskListTab, GanttChartTab } from "../../components/views/tasks";
import { CreateTaskFormWithAssignees, ContextMenu, ContextMenuWrapper } from "../../components";
import { MyContractsTab, AddContractTab, SearchContractsTab, ContractsBoardTab } from "../../components/views/contracts";
import { useRouter } from "next/router";
import { useRenderByID } from "../useRenderByID/useRenderByID";
import { TestTab } from "../../components/views/homepageTabs/TestTab";

export function useTabRenderer() {
    const { tabRender, setTabRender } = useContext(TabRenderCtx) as TabRenderCtx_Props;
    const router = useRouter();
    const { renderByID } = useRenderByID();
    const Tabs: TabRenderCtxTypes[] = [
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
            label: "my_contracts",
            component: <MyContractsTab />
        },
        {
            label: "add_contract",
            component: <AddContractTab />
        },
        {
            label: "search_contracts",
            component: <SearchContractsTab />
        },
        {
            label: "contracts_board",
            component: <ContractsBoardTab />
        },
        {
            label: "test",
            component: <TestTab />
        }
    ];
    const homePageTabs = useMemo<TabRenderCtxTypes[]>(()=> [...new Set<TabRenderCtxTypes>([...Tabs])], [router]);
    // const [homePageTabs, setHomePageTabs] = useState<TabRenderCtxTypes[]>([...Tabs]);

    const [tabRendererConfig, setTabRendererConfig] = useState<{
        route: string;
        defaultTab: string;
        tabs: string[];
    }[]>([
        {
            route: "/",
            defaultTab: "",
            tabs: []
        },
        {
            route: "/contracts",
            defaultTab: "",
            tabs: []
        },
        {
            route: "/workflow",
            defaultTab: "",
            tabs: []
        },
        {
            route: "/activity",
            defaultTab: "",
            tabs: []
        },
        {
            route: "/reports",
            defaultTab: "",
            tabs: []
        }
    ]);
    // when switchTab is called, it checks against the tabRenderer config for the parent route associated with the target tab, if the parentRoute is the same as the current route, then the tab is rendered else, the default tab is rendered.
    // this implementation is to prevent tab renderer state persistence across routes
    function validTab() {
        const currentRoute = router.pathname;
        const routeIndex = tabRendererConfig.findIndex((configRoute) => currentRoute === configRoute.route);
        
        // check if the currentTab exists in the tabs[] list
        if (tabRendererConfig[routeIndex].tabs.includes(tabRender.label)) {
            return tabRender.label;
        } else {
            return tabRendererConfig[routeIndex].defaultTab;
        }
    }

    // implement some tab history logic i.e: using a stack

    // function for switching tabs
    function switchTab(tab: {label: string, component?: JSX.Element | React.ReactNode}): TabRenderCtxTypes {
        if (tabRender.label !== tab.label) {
            // check if the tab exists in the tab list, if not, add it to the list if there is a component provided

            setTabRender({
                label: tab.label,
                component: tab.component ?? <></>
            });
        }

        return tab;
    }

    // implement default tab to be rendered on route change to prevent tab state persistence across routes.


    function showCurrentTab(): JSX.Element | React.ReactNode {
        if (homePageTabs.some((tab_) => tab_.label === tabRender.label)) {
            return homePageTabs[homePageTabs.findIndex((tab_obj) => tab_obj.label === tabRender.label)].component;
        } else {
            // return the element at the top of the stack

            return switchTab(homePageTabs[0]).component;
        }
    }

    return {
        currentTab: tabRender,
        switchTab,
        showCurrentTab
    }
}