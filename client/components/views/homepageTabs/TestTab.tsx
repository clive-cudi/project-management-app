import React, { useState } from "react";
import { useRenderByID } from "../../../hooks";

export const TestTab = (): JSX.Element => {
    const wrapperStyles: React.CSSProperties = {
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
    const { addComponent, registerProps, renderByID } = useRenderByID();
    const [targetID, setTargetID] = useState<string>(`twhnus${Math.random() * 10}`)

    function handleAddComponent() {
        const targetComponent = {
            compID: targetID,
            component: <span>Component by ID: {targetID}</span>
        }

        console.log(addComponent(targetComponent.compID, targetComponent.component))
    }

    function handleAddColorProp() {
        console.log(registerProps(targetID, {
            style: {
                color: "green"
            },
        }))
    }

    return (
        <div style={wrapperStyles}>
            {
                targetID && renderByID(targetID).call({})
            }
            <button onClick={() => {handleAddComponent()}}>Add Component to repo</button>
            <button onClick={() => {handleAddColorProp()}}>Add Color Prop</button>
        </div>
    )
}