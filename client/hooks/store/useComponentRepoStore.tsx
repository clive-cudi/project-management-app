import create  from "zustand";
import { componentRepoInstance } from "../useRenderByID/useRenderByID";
import { HealthStatusWidget, ProfileIcon } from "../../components";

interface ComponentsRepoStoreType {
    staticComponents: componentRepoInstance[],
    components: componentRepoInstance[],
    addToComponentStore: (component: componentRepoInstance) => void
    resetComponentsStore: (newRepo: componentRepoInstance[]) => void
}

export const useComponentRepoStore = create<ComponentsRepoStoreType>()((set) => {
    const staticComponents: componentRepoInstance[] = [
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
        {
            compID: "profile_icon",
            component: <ProfileIcon user={{uid: "cnuvebufr383j_", profilePicURL: "https://source.unsplash.com/random"}}  />,
            fullID: "__component@profile_icon"
        }
    ]
    return {
        staticComponents: staticComponents,
        components: [...staticComponents],
        addToComponentStore(component) {
            return set((state) => {
                return {components: [...state.components, component]}
            })
        },
        removeFromComponentStore(compID: string) {
            return set((state) => {
                return {components: [...state.components].filter((cmpnt) => cmpnt.compID !== compID)}
            })
        },
        resetComponentsStore(newRepo: componentRepoInstance[]) {
            return set((state) => ({components: newRepo}));
        }
    }
})