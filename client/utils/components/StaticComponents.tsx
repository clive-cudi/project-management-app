import React from "react";
import { HealthStatusWidget, ProfileIcon } from "../../components";
import { componentRepoInstance } from "../../hooks/useRenderByID/useRenderByID";

export const staticComponents = [
    {
        compID: "test_component",
        component: () => <h3>Test Component from useRenderID()</h3>,
        fullID: "__component@text_component",
    },
    {
        compID: "user_ribbons",
        component: () => <h3>User Ribbons</h3>,
        fullID: "__component@user_ribbons"
    },
    {
        compID: "health_status_active",
        component: () => <HealthStatusWidget status={"active"} /> ?? null,
        fullID: "__component@health_status_active"
    },
    {
        compID: "health_status_dormant",
        component: () => <HealthStatusWidget status={"dormant"} /> ?? null,
        fullID: "__component@health_status_dormant"
    },
    {
        compID: "health_status_inactive",
        component: () => <HealthStatusWidget status={"inactive"} /> ?? null,
        fullID: "__component@health_status_inactive"
    },
    {
        compID: "profile_icon",
        component: () => <ProfileIcon user={{uid: "cnuvebufr383j_", profilePicURL: "https://source.unsplash.com/andom"}}  /> ?? null,
        fullID: "__component@profile_icon"
    }
];