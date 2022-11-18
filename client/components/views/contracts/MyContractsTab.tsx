import { useState } from "react";
import styles from "../../../styles/views/contracts/myContractsTab.module.scss";
import { InputSelect, RegularBtn, IconBtn, ContractStatsCard } from "../../reusable";
import { BsPlus } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { upperCaseFirstSentence } from "../../../utils";

export const MyContractsTab = (): JSX.Element => {
    const [statsData, setStatsData] = useState<{title: string, stats: number}[]>([
        {
            title: "total_annual_contracts",
            stats: 70
        },
        {
            title: "clients",
            stats: 6
        },
        {
            title: "open_approvals",
            stats: 5
        }
    ]);

    return (
        <div className={styles.mct_content}>
            <div className={styles.mct_content_col}>
                <div className={styles.mct_content_col_header}>
                    <div className={styles.mct_header_col}>
                        <h2>Overview</h2>
                        <RegularBtn label={"Add Contract"} withIcon={{status: true, icon: <BsPlus fontSize={16} />, orientation: "start"}} variant={"outlined"} data-elm-func={"add-btn"} onClick={() => {}} />
                    </div>
                    <div className={styles.mct_header_col}>
                        <InputSelect options={[{label: "Popular", value: "popular"}]} onChange={(): void => {}} />
                        <IconBtn icon={<FiFilter />} variant={"outlined"} data-elm-func={"icon-btn"} onClick={(): void => {}} />
                    </div>
                </div>
                <div className={styles.mct_stats_strip}>
                    {
                        statsData.map((statCard) => <ContractStatsCard title={upperCaseFirstSentence(statCard.title, "_")} stats={statCard.stats} />)
                    }
                </div>
            </div>
            <div className={styles.mct_content_col}>

            </div>
        </div>
    )
}