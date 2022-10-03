import { useState } from "react";
import { LayoutCtx, LayoutCtxDefaults, LayoutCtxTypes } from "../../context";

export const LayoutCtxProvider = ({children}: any) => {
    const [layout, setLayout] = useState<LayoutCtxTypes>(LayoutCtxDefaults);

    return (
        <LayoutCtx.Provider value={{layout, setLayout}}>
            {children}
        </LayoutCtx.Provider>
    )
}