import React, { useContext, useMemo } from "react";
import { TabRenderCtx, TabRenderCtx_Props, TabRenderCtxTypes, TabRenderCtxDefaults } from "../../context";
import { HomeTab } from "../../components/views/homepageTabs/Hometab";
import { MessagesTab } from "../../components/views/homepageTabs/MessagesTab";
import { WorkSpaceTab } from "../../components/views/homepageTabs/WorkSpaceTab";
import { MembersTab } from "../../components/views/homepageTabs/MembersTab";
import { SettingsTab } from "../../components/views/homepageTabs/SettingsTab";
import { ProjectDashBoardTab, ProjectDetailsTab, ProjectSummaryTab, ProjectsBoard } from "../../components/views/project";
import { TasksOverviewTab } from "../../components/views/tasks";

export function useTabRenderer() {
    const { tabRender, setTabRender } = useContext(TabRenderCtx) as TabRenderCtx_Props;
    const homePageTabs = useMemo<TabRenderCtxTypes[]>(()=> [...new Set<TabRenderCtxTypes>([
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
            label: "tasks_overview",
            component: <TasksOverviewTab />
        },
        {
            label: "test",
            component: <TasksOverviewTab />
        }
    ])], [])

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