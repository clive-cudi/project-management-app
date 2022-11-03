import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { RegularBtn } from "../buttons";
import { BsPlus } from "react-icons/bs";
import Image from "next/image";

export const MilestoneWidget = (): JSX.Element => {
    return (
        <div className={styles.msw_wrapper}>
            <div className={styles.msw_ill_cont}>
                <div className={styles.msw_ill}>
                    <Image src={"/common/milestone_illustration.png"} alt={"@milstone_illustrat!on"} layout={"fill"} />
                </div>
            </div>
            <div className={styles.msw_info}>
                <p>You have no milestones for today</p>
            </div>
            <div className={styles.msw_add}>
                <RegularBtn label={'Create Milestone'} withIcon={{status: true, icon: <BsPlus />, orientation: "start"}} variant={"gradient"} onClick={() => {}} />
            </div>
        </div>
    )
}