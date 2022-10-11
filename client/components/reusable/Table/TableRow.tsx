import { MouseEvent, CSSProperties } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";

interface TableRow_Props {
    rowData: any[]
    clickable?: boolean,
    onClick?: (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void
}

export const TableRow = ({rowData, clickable, onClick}: TableRow_Props) => {
    const rowStyling: CSSProperties = {
        borderBottom: "0.5px solid yellow"
    }

    return (
        <tr onClick={(e)=> {
            if (clickable && onClick) {
                onClick(e);
            }
        }} className={clickable ? styles.tr_clickable : ""}>
            {
                rowData.map((cell, i) => {
                    return (
                        <td key={i}>{cell}</td>
                    )
                })
            }
        </tr>
    )
}