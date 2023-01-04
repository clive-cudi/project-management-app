import React, { useMemo, cloneElement, isValidElement, ReactNode, useState } from "react";
import { HealthStatusWidget, ProfileIcon } from "../../components";

interface componentRepoInstance {compID: string, component: JSX.Element | React.ReactNode, fullID: string}

export function useRenderByID() {
    const staticComponentsRepo = useMemo<componentRepoInstance[]>(() => [
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
    ], []);

    const [componentsRepo, setComponentsRepo] = useState<componentRepoInstance[]>([
        ...staticComponentsRepo
    ])

    function renderByID(id: string): JSX.Element | React.ReactNode {
        // find the component in componentsRepo
        if (componentsRepo.some((compnt) => compnt.compID === id)) {
            return componentsRepo[componentsRepo.findIndex((compnt_obj) => compnt_obj.compID === id)].component;
        } else {
            console.log("can't find the component")
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

                setComponentsRepo((prevRepo) => {
                    return [...prevRepo, newComponentObj]
                })
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

        setComponentsRepo(() => newRepo);

        return newRepo;
    }

    return {
        renderByID,
        addComponent,
        registerProps
    }
}