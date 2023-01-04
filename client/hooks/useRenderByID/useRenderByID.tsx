import React, { useMemo, cloneElement, isValidElement, ReactNode, useState, useEffect } from "react";
import { HealthStatusWidget, ProfileIcon } from "../../components";
import { useComponentRepoStore } from "../store";

export interface componentRepoInstance {compID: string, component: JSX.Element | React.ReactNode, fullID: string}

export function useRenderByID() {
    // [todo: move the repo to zustand state to prevent state reset everytime useRenderByID() is called => being causing "component not found error"]
    const { components: componentsRepo, addToComponentStore, resetComponentsStore } = useComponentRepoStore();

    useEffect(() => {console.log(componentsRepo)}, [componentsRepo])

    function renderByID(compID: string): JSX.Element | React.ReactNode {
        // find the component in componentsRepo
        // console.log(compID);
        console.log("Exists :=> " + componentsRepo.find((cp) => cp.compID == compID)?.compID);
        if (componentsRepo.find((compnt) => compnt.compID === compID)) {
            console.log(componentsRepo[componentsRepo.findIndex((compnt_obj) => compnt_obj.compID === compID)].component)
            return componentsRepo[componentsRepo.findIndex((compnt_obj) => compnt_obj.compID === compID)].component;
        } else {
            // console.log("can't find the component ID: " + compID );
            return <></>
        }
    }

    function addComponent(compID: string, component: JSX.Element | ReactNode ): componentRepoInstance {
        // adds a component to the repo
        // check if the componentID exists
        if (componentsRepo.some((cmpntObj) => cmpntObj.compID === compID ) === false) {
            if (isValidElement(component)) {
                const newComponentObj: componentRepoInstance = {
                    compID: compID,
                    component: component,
                    fullID: "__component@" + String(compID)
                }

                addToComponentStore(newComponentObj);
                
            }
        }

        return {
            compID: compID,
            component: component,
            fullID: "__component@" + String(compID)
        }
    } 

    function registerProps(componentID: string, props: {[key: string]: any}) {
        // search through the componentList and add props to the element

        const newRepo = componentsRepo.map((componentObj) => {
            if (componentObj.compID === componentID) {
                if (isValidElement(componentObj.component)) {
                    const updatedComponent = cloneElement(componentObj.component, {
                        ...props
                    });

                    componentObj["component"] = updatedComponent;

                    return componentObj;
                }
            } 
        }) as componentRepoInstance[];

        resetComponentsStore(newRepo);

        return newRepo;
    }

    return {
        renderByID,
        addComponent,
        registerProps
    }
}