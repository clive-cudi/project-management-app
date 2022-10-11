import { CSSProperties } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";

interface TableRow_Props {
    rowData: any[]
}

export const TableRow = ({rowData}: TableRow_Props) => {
    const rowStyling: CSSProperties = {
        borderBottom: "0.5px solid yellow"
    }

    return (
        <tr>
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