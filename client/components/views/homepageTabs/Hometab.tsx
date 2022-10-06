import styles from "../../../styles/views/homePageTabs/hometab.module.scss";
import Image from "next/image";
import { RegularBtn } from "../../reusable";
import { BsPlay } from "react-icons/bs";

export const HomeTab = ({}): JSX.Element => {
    return (
        <div className={styles.hb_content}>
            <div className={styles.hb_greetings_wrapper}>
                <div className={styles.hb_banner_wrapper}>
                    <div className={styles.hb_banner_info}>
                        <h2>Good Morning Madaline</h2>
                        <RegularBtn label="Get Started" className={styles.get_started_btn} withIcon={{status: true, icon: <BsPlay />, orientation: "start"}} />
                    </div>
                    <div className={styles.hb_banner_ill}>
                        <div className={styles.hb_ill}>
                            <Image src={"/common/Illustration_4.png"} alt="@" layout="fill" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.hb_info_wrapper}>
                <div className={styles.hb_tasks_wrapper}>

                </div>
                <div className={styles.hb_calendar_wrapper}>

                </div>
            </div>
            <div className={styles.hb_projects_wrapper}>

            </div>
        </div>
    )
}