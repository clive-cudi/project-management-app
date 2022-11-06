import React, { useState, useEffect, useMemo, MouseEvent } from "react";
import styles from "../../../styles/components/reusable/navbars/sidenav.module.scss";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { IconBtn, RegularBtn } from "../buttons";
import { useModal, useTabRenderer } from "../../../hooks";
import { ModalFormWrapper } from "../../layout";
import { CreateProjectForm, CreateTaskFormWithAssignees, AddWorkSpaceForm } from "../../forms";
import { BiMessageSquareAdd } from "react-icons/bi";
import { DropDownNavWidget, DropDownoption_, DropDownWidget_Props } from "../widgets";

interface SideNav_Props {
    isMinNav?: (isMinVal: boolean)=> void
    switchBtns: {
        btnComponent: JSX.Element | React.ReactNode
    }[]
    tasks?: []
    projects?: [] 
}

export const SideNav = ({switchBtns, tasks, projects, isMinNav}: SideNav_Props): JSX.Element => {
    const [isMin, setIsMin] = useState<boolean>(false);
    const { openModal } = useModal();
    const myTasksDropDownOptions = useMemo<DropDownoption_[]>(() => {
        return [
            {
                label: "overview",
                onClickHandler: (e) => {
                    
                }
            },
            {
                label: "create_new_task",
                onClickHandler: (e) => {
                    
                }
            },
            {
                label: "import_tasks",
                onClickHandler: (e) => {
                    
                }
            },
            {
                label: "task_list",
                onClickHandler: (e) => {

                }
            },
            {
                label: "tasks_board",
                onClickHandler: (e) => {

                }
            },
            {
                label: "gantt_chart",
                onClickHandler: (e) => {

                }
            }
        ]
    }, []);
    const { switchTab } = useTabRenderer();
    const modalInitTabs = useMemo(() => ["create_new_task", "import_tasks"], []);
    const [isTasksCollapsed, setIsTasksCollapsed] = useState<boolean>(false);

    function toggleNavMin(): void {
        if (isMin === true) {
            setIsMin(false);
        } else {
            if (isTasksCollapsed === true) {
                setIsTasksCollapsed(false);
            }
            setIsMin(true);
        }
    }

    function handleTaskDropDownTabActionClick(optionTab: string) {
        // handle the exceptional click cases i.e click options that don't implement useTabRenderer
        switch(optionTab) {
            case "create_new_task":
                return openModal(<CreateTaskFormWithAssignees />);
            case "import_tasks":
                return openModal(<></>);
            default:
                return switchTab({
                    label: optionTab
                })
        }
    }

    function toggleIsTasksCollapsed(): void {
        if (isTasksCollapsed === true) {
            setIsTasksCollapsed(false);
        } else {
            setIsTasksCollapsed(true);
        }
    }

    useEffect(() => {if (isMinNav) {isMinNav(isMin)}});

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
                <RegularBtn label={isMin ? "" : "Create WorkSpace"} withIcon={{status: true, icon: <BiMessageSquareAdd />, orientation: "start"}} variant={"gradient"} data-id={"create-workspace-btn"} onClick={() => {
                    openModal(<ModalFormWrapper form={<AddWorkSpaceForm />} title={`Create Workspace`} />)
                }} />
                <span className={styles.nav_mini_title} onClick={() => {
                    // if the navbar is min then expand it for task collapse items fit.
                    if (isMin === true && isTasksCollapsed === false) {
                        setIsMin(false);
                    }
                    toggleIsTasksCollapsed();
                }}>{isMin == false ? <span className={styles.nav_mini_title_txt}>MY TASKS</span> : ''}<IconBtn icon={<IoIosAdd />} variant={"util"} onClick={(e) => {
                    e.stopPropagation();
                    openModal(<CreateTaskFormWithAssignees />)
                }} /></span>
                <div className={styles.sn_tasks_wrapper}>
                    {isTasksCollapsed ? <DropDownNavWidget options={myTasksDropDownOptions.map((option) => ({...option, onClickHandler: () => {handleTaskDropDownTabActionClick(option.label)}, hasActiveTabSwitch: !modalInitTabs.includes(option.label)}))} /> : null}
                </div>
                <span className={styles.nav_mini_title}>{isMin == false ? <span className={styles.nav_mini_title_txt}>MY PROJECTS</span> : ''}<IconBtn icon={<IoIosAdd />} variant={"util"} onClick={() => {
                    openModal(<ModalFormWrapper form={<CreateProjectForm />} title={`Create Project`} />)
                }} /></span>
                <div className={styles.sn_projects_wrapper}>

                </div>
            </div>
        </nav>
    )
}