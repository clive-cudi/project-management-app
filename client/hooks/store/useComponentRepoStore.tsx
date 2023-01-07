import create  from "zustand";
import { componentRepoInstance } from "../useRenderByID/useRenderByID";
import { staticComponents as static_components } from "./StaticComponents";
import { useEffect, useState } from "react";

interface ComponentsRepoStoreType {
    staticComponents: componentRepoInstance[],
    components: componentRepoInstance[],
    addToComponentStore: (component: componentRepoInstance) => void
    addToStaticComponentStore: (component: componentRepoInstance) => void
    addMultipleStaticComponentsToStore: (components: componentRepoInstance[]) => void
    resetComponentsStore: (newRepo: componentRepoInstance[]) => void
}

export const useComponentRepoStore = create<ComponentsRepoStoreType>()((set) => {
    const [staticComponents, setStaticComponents] = useState<componentRepoInstance[]>([]);

    useEffect(() => {setStaticComponents(static_components)}, [])

    return {
        staticComponents: staticComponents,
        components: [...staticComponents],
        addToComponentStore(component) {
            return set((state) => {
                return {components: [...state.components, component]}
            })
        },
        // adds to both static and component store
        // [todo: find a way to persist the static component store]
        addToStaticComponentStore(component) {
            return set((state) => {
                return {staticComponents: [...state.staticComponents, component], components: [...state.components, component]}
            })
        },
        addMultipleStaticComponentsToStore(components) {
            return set((state) => {
                return {staticComponents: [...state.staticComponents.filter((scmpnt) => components.some((cp) => cp.compID === scmpnt.compID) === false)], components: [...state.components.filter((cmpnt) => components.some((cp) => cp.compID === cmpnt.compID) === false)]}
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