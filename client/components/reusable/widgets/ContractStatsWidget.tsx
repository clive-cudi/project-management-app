import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconBtn } from "../buttons";
import { upperCaseFirstSentence } from "../../../utils";

export interface ContractStatsWidgetData {
    label: string,
    color: string,
    percentage: number
}

interface ContractStatsWidget_Props {
    title: string,
    contractData: ContractStatsWidgetData[]
}

export const ContractStatsWidget = ({ title, contractData }: ContractStatsWidget_Props): JSX.Element => {
    return (
        <div className={styles.cswg_wrapper}>
            <div className={styles.cswg_header}>
                <div className={styles.cswg_header_title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.cswg_header_util}>
                    <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} onClick={() => {}} />
                </div>
            </div>
            <div className={styles.cswg_content}>
                <div className={styles.cswg_col}>
                    <ul>
                        {
                            contractData.map((contract, index) => {
                                return (
                                    <li key={index}>
                                        <span className={`${styles.cswg_indicator} ${styles[`_${contract.color}`]}`} style={{background: contract.color}}></span>
                                        <h5>{upperCaseFirstSentence(contract.label, "_")}</h5>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={styles.cswg_col}>
                    {/* Pie chart here (from lib) */}
                </div>
            </div>
        </div>
    )
}