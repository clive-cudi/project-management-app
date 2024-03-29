import React, { useEffect, useState } from "react";
import { useRenderByID, useLazyQuery, useModal } from "../../../hooks";
import { AuthQueries } from "../../../utils";
import { useSession } from "next-auth/react";
import { ProfileIcon } from "../../reusable";
import { CreateClientForm } from "../../forms";
import { ModalFormWrapper } from "../../layout";

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
    const { openModal } = useModal()

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
            <button onClick={() => {
                openModal(<ModalFormWrapper form={<CreateClientForm />} />)
            }}>Open Create Client form</button>
            <span>useLazyQueryResult: {JSON.stringify(me_data)}</span>
            <ProfileIcon user={{uid: "0041bbbb-8f13-44cd-85c1-2ffbe657cc76", profilePicURL: ""}} showDetailsOnHover fetchDetails />
        </div>
    )
}