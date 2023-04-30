import React, { useEffect, useState } from "react";
import { useRenderByID, useLazyQuery } from "../../../hooks";
import { AuthQueries } from "../../../utils";
import { useSession } from "next-auth/react";

export const TestTab = (): JSX.Element => {
    const wrapperStyles: React.CSSProperties = {
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "10px"
    }
    const session = useSession();
    const { addComponent, registerProps, renderByID } = useRenderByID();
    const [targetID, setTargetID] = useState<string>(`twhnus${Math.random() * 10}`);
    const { getMe } = AuthQueries(session);
    const [fetchMe, {data: me_data}] = useLazyQuery(["me_query"], getMe);

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

    useEffect(() => {
        console.log(me_data);
    }, [me_data]);

    return (
        <div style={wrapperStyles}>
            {
                targetID && renderByID(targetID).call({})
            }
            <button onClick={() => {handleAddComponent()}}>Add Component to repo</button>
            <button onClick={() => {handleAddColorProp()}}>Add Color Prop</button>
            <button onClick={() => {fetchMe()}}>Trigger useLazyQuery()</button>
            <span>useLazyQueryResult:</span>
        </div>
    )
}