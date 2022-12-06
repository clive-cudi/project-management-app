import React, { useMemo } from "react";

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
        }
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