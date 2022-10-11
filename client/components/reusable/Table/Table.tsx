import { MouseEvent } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";
import { TableRow } from "./TableRow";

interface Table_Props {
    tableConfig?: {
        headers: string[] | JSX.Element[] | React.ReactNode[]
        data: string[][]
    }
    className?: string
    clickableRows?: boolean
    onClickHandler?: (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>, clickedRow: number) => void
}

export const Table = ({tableConfig, className, clickableRows, onClickHandler}: Table_Props) => {
    return (
        <table className={`${styles.table} ${className ?? ""}`}>
            <thead>
                <tr>
                    {
                        tableConfig?.headers.map((header, ix)=> {
                            return (
                                <th key={ix}>{typeof header == "string" ? <h4>{header}</h4> : header}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableConfig?.data.map((rowData, index) => {
                        return (
                            <TableRow key={index} rowData={rowData} clickable={clickableRows ?? false} onClick={(e)=> {
                                if (clickableRows && onClickHandler) {
                                    onClickHandler(e, index);
                                }
                            }} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}