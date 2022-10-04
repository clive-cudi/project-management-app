import React, { useState } from "react";
import styles from "../../../styles/components/reusable/navbars/sidenav.module.scss";
import { AiFillStar } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

interface SideNav_Props {
    isMin?: boolean
    switchBtns: {
        btnComponent: JSX.Element | React.ReactNode
    }[]
    tasks?: []
    projects?: [] 
}

export const SideNav = ({switchBtns, tasks, projects}: SideNav_Props): JSX.Element => {
    const [isMin, setIsMin] = useState<boolean>(false);

    function toggleNavMin(): void {
        if (isMin === true) {
            setIsMin(false);
        } else {
            setIsMin(true);
        }
    }

    return (
        <nav className={`${styles.sn_main_wrapper} ${isMin ? styles.sn_min_wrapper : styles.sn_max_wrapper}`}>
            <div className={styles.sn_content}>
                <div className={styles.sn_logo_wrapper}>
                    <span className={styles.sn_logo}>
                        {/* logo here */}
                        {/* eslint-disable-next-line */}
                        <img src="/logos/primaryLogoIcon.png" alt="P" />
                        {isMin === false && <h5>PMT</h5>}
                    </span>
                    {/* minimize toggle button */}
                    <button onClick={toggleNavMin}>{isMin ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}</button>
                </div>
                <div className={styles.sn_btn_links}>
                    <ul>
                        {
                            switchBtns.map((btn, index)=> {
                                return (
                                    <li key={index}>{btn.btnComponent}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <span className={styles.nav_mini_title}>{isMin == false ? <span className={styles.nav_mini_title_txt}>My Tasks</span> : ''}<AiFillStar /></span>
                <div className={styles.sn_tasks_wrapper}>

                </div>
                <span className={styles.nav_mini_title}>{isMin == false ? <span className={styles.nav_mini_title_txt}>My Projects</span> : ''}<AiFillStar /></span>
                <div className={styles.sn_projects_wrapper}>

                </div>
            </div>
        </nav>
    )
}