import { useState } from "react";
import styles from "../../../styles/views/contracts/myContractsTab.module.scss";
import { InputSelect, RegularBtn, IconBtn, ContractStatsCard, ContractStatsWidget, ContractStatsWidgetData, Table } from "../../reusable";
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
    const [contractStatsData, setContractStatsData] = useState<ContractStatsWidgetData[]>([
        {
            label: "contract_a",
            color: "#855CF8",
            percentage: 12
        },
        {
            label: "contract_b",
            color: "#263238",
            percentage: 12
        },
        {
            label: "contract_c",
            color: "#C638DE",
            percentage: 12
        },
        {
            label: "contract_d",
            color: "#FFACAC",
            percentage: 64
        }
    ]);
    const [contractExpiryData, setContractExpiryData] = useState({
        headers: ["date", "contract_name", "client_name"],
        data: [
            ["20/4/22", "X", "A"],
            ["1/5/22", "Y", "B"],
            ["18/5/22", "Z", "C"]
        ]
    })

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
                <div className={styles.mct_stat_charts_strip}>
                    <ContractStatsWidget title={"Number of contracts by type"} contractData={contractStatsData} />
                    <ContractStatsWidget title={"Renewals approaching"} contractData={contractStatsData} />
                </div>
            </div>
            <div className={styles.mct_content_col}>
                <div className={styles.mct_notifications_wrapper}>
                    <div className={styles.mctnf_header}>
                        <h4>Alerts</h4>
                    </div>
                    <div className={styles.mctnf_alert_list}>
                        <ul></ul>
                    </div>
                    <div className={styles.mctnf_contract_expiry}>
                        <h4>Today</h4>
                        <Table tableConfig={{headers: contractExpiryData.headers.map((title) => upperCaseFirstSentence(title, "_")), data: contractExpiryData.data}} />
                    </div>
                </div>
            </div>
        </div>
    )
}