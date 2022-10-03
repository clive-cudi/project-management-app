import React from "react";
import styles from "../../../styles/components/reusable/navbars/sidenav.module.scss";
import { AiFillStar } from "react-icons/ai";

interface SideNav_Props {
    isMin?: boolean
    switchBtns: {
        btnComponent: JSX.Element | React.ReactNode
    }[]
    tasks?: []
    projects?: [] 
}

export const SideNav = ({isMin, switchBtns, tasks, projects}: SideNav_Props): JSX.Element => {
    return (
        <nav className={styles.sn_main_wrapper}>
            <div className={styles.sn_content}>
                <div className={styles.sn_logo_wrapper}>
                    <span className={styles.sn_logo}>
                        {/* logo here */}
                        <h5>PMT</h5>
                    </span>
                    {/* minimize toggle button */}
                    <button></button>
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