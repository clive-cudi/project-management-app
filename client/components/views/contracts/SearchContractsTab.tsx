import { useState } from "react";
import styles from "../../../styles/views/contracts/searchContractsTab.module.scss";
import { RegularBtn, SearchInput, InputSelect, InputCheck, Table } from "../../reusable";
import { upperCaseFirstSentence } from "../../../utils";

export const SearchContractsTab = (): JSX.Element => {
    // for rendering the table
    const [searchTableData, setSearchTableData] = useState({
        headers: ["id", "contract_name", "contract_type", "client", "contract_owner", "start_date", "termination_date", "status"],
        data: [
            ["01", "Mobile App", "Design", "Brown Savannah ltd", "Alice", "February 17 2021", "February 17 2022", "active"],
            ["02", "Tiba Smart Dev", "Development", "Pharma Co.", "Belinda", "February 20 2021", "February 20 2022", "active"]
        ]
    });

    return (
        <div className={styles.sct_content}>
            <div className={styles.sct_header}>
                <div className={styles.sct_header_col}>
                    <span>Open Contracts</span>
                    <span>Archived Contracts</span>
                    <span>Contract Board</span>
                </div>
                <div className={styles.sct_header_col}>
                    <RegularBtn label={"Add Contract"} variant={"gradient"} onClick={(): void => {}} />
                </div>
            </div>
            <div className={styles.sct_search_content}>
                <div className={styles.sct_search_header}>
                    <div className={styles.sct_search_row}>
                        <SearchInput placeholder={"Search by Name, Client, Type"} onChange={(e): void => {}} />
                    </div>
                    <div className={styles.sct_search_row}>
                        <span className={styles.sct_search_row_span}>
                            <label>Client: </label>
                            <InputSelect options={[]} />
                        </span>
                        <span className={styles.sct_search_row_span}>
                            <label>Type:</label>
                            <InputSelect options={[]} />
                        </span>
                        <span className={styles.sct_search_row_span}>
                            <label>Contract&nbsp;Value: </label>
                            <InputSelect options={[]} />
                        </span>
                        <span className={styles.sct_search_row_span}>
                            <label>Termination&nbsp;Date: </label>
                            <InputSelect options={[]} />
                        </span>
                    </div>
                    <div className={styles.sct_search_row}>
                        <span className={styles.sct_search_row_span}><InputCheck /> <label>Active</label></span>
                        <span className={styles.sct_search_row_span}><InputCheck /> <label>Draft</label></span>
                        <span className={styles.sct_search_row_span}><InputCheck /> <label>Pending</label></span>
                        <span className={styles.sct_search_row_span}><InputCheck /> <label>Expired</label></span>
                    </div>
                </div>
                <div className={styles.sct_search_table}>
                    {/* Table Component here */}
                    <Table tableConfig={{headers: searchTableData.headers.map((header) => upperCaseFirstSentence(header, "_")), data: searchTableData.data}} />
                </div>
            </div>
        </div>
    )
}