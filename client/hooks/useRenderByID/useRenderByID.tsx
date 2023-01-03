import React, { useMemo } from "react";
import { HealthStatusWidget } from "../../components";

export function useRenderByID() {
    const componentsRepo = useMemo<{compID: string, component: JSX.Element | React.ReactNode, fullID: string}[]>(() => [
        {
            compID: "test_component",
            component: <h3>Test Component from useRenderID()</h3>,
            fullID: "__component@text_component",
        },
        {
            compID: "user_ribbons",
            component: <h3>User Ribbons</h3>,
            fullID: "__component@user_ribbons"
        },
        {
            compID: "health_status_active",
            component: <HealthStatusWidget status={"active"} />,
            fullID: "__component@health_status_active"
        },
        {
            compID: "health_status_dormant",
            component: <HealthStatusWidget status={"active"} />,
            fullID: "__component@health_status_dormant"
        },
        {
            compID: "health_status_inactive",
            component: <HealthStatusWidget status={"inactive"} />,
            fullID: "__component@health_status_inactive"
        },
    ], [])

    function renderByID(id: string): JSX.Element | React.ReactNode {
        // find the component in componentsRepo
        if (componentsRepo.some((compnt) => compnt.compID === id)) {
            return componentsRepo[componentsRepo.findIndex((compnt_obj) => compnt_obj.compID === id)].component;
        } else {
            return <></>
        }
    }

    return {
        renderByID
    }
}