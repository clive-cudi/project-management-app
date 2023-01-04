import { MouseEvent, CSSProperties, ReactNode, useEffect } from "react";
import styles from "../../../styles/components/reusable/table/table.module.scss";
import { useRenderByID } from "../../../hooks";
import { CMPNT_REF_REGEX } from "../../../utils";

interface TableRow_Props {
  rowData: any[];
  clickable?: boolean;
  onClick?: (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => void;
  emptyMessage?: string;
  headers: string[] | Element[] | ReactNode[]
}

export const TableRow = ({
  rowData,
  clickable,
  onClick,
  emptyMessage,
  headers
}: TableRow_Props) => {
  const rowStyling: CSSProperties = {
    borderBottom: "0.5px solid yellow",
  };
  const regexCmpntRef: RegExp = new RegExp(CMPNT_REF_REGEX);
  const { renderByID } = useRenderByID();

  return (
    <tr
      onClick={(e) => {
        if (clickable && onClick) {
          onClick(e);
        }
      }}
      className={clickable ? styles.tr_clickable : ""}
    >
        {/* add functionality for rendering special components in cells since the arrays are limited to a single data type */}
        {/* represent special components with strings using a specific unique format and the component ID passed on to a renderer function that renders the corresponding component with its ID */}
        {/* __component@componentID */}
      {rowData.length > 0 ? (
        rowData.map((cell, i) => {
        //   typecheck the cell since renderbyID reference will work on strings only
        if (typeof cell === "string") {
            if (regexCmpntRef.test(cell)) {
                // extract the component ID
                console.log(`Found Component Ref ${cell}`)
                // console.log(`Rendering componentID: ${(cell.match(/[^__component\s@](.)*/) ?? [])[0]}`);
                console.log(`Rendering componentID: ${cell.substring((cell.indexOf("@") + 1))} `)
                // return <td>{renderByID((cell.match(/[^__component](.*)/) ?? ["", ""])[1])}</td>
                return <td key={i}>{renderByID(cell.substring((cell.indexOf("@") + 1)))}</td>
            } else {
                return <td key={i}>{cell}</td>;
            }
        } else {
            return <td key={i}>{cell}</td>;
        }
        })
      ) : (
        <td key={20} colSpan={headers.length} data-elm-type={"empty-table-row"}>{emptyMessage ?? "No data to display"}</td>
      )}
    </tr>
  );
};
