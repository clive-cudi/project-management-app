import React, { useState, useMemo } from "react";
import type { NextPage } from "next";
import styles from "../../styles/pages/contracts/index_contracts.module.scss";
import { Header, SideNav, TopNav, Modal, SideNavBtn } from "../../components";
import type { PageAuth, ContractPageLabelsType } from "../../types";
import { useTabRenderer, useModal } from "../../hooks";
import { FaFileContract } from "react-icons/fa";
import { HiDocumentAdd, HiOutlineDocumentSearch } from "react-icons/hi";
import { upperCaseFirstSentence } from "../../utils";
import { HomePageCurrentTab } from "../../components";
import { BsColumns } from "react-icons/bs";
import { BiTestTube } from "react-icons/bi";

export default function ContractsHome() {
    const [navMin, setNavMin] = useState<boolean>(false);

    const contractNavBtns = useMemo<Array<{label: ContractPageLabelsType | "test", icon: React.ReactNode}>>(() => [
        {
            label: "my_contracts",
            icon: <FaFileContract />
        },
        {
            label: "add_contract",
            icon: <HiDocumentAdd />
        },
        {
            label: "search_contracts",
            icon: <HiOutlineDocumentSearch />
        },
        {
            label: "contracts_board",
            icon: <BsColumns />
        },
        {
            label: "test",
            icon: <BiTestTube />
        }
    ], []);
    const { modal } = useModal();
    const { currentTab, switchTab } = useTabRenderer();

    const navSwitchBtns: { btnComponent: JSX.Element }[] = useMemo<{ btnComponent: JSX.Element }[]>(() => {
        return contractNavBtns.map((btn, i) => {
            return {
                btnComponent: (
                    <SideNavBtn key={i} onClick={(): void => {
                        switchTab({
                            label: btn.label,
                            component: null
                        })
                    }} isActive={btn.label.toLowerCase() === currentTab.label.toLowerCase()} variant={"primary"}>
                        <span>{btn.icon}</span>
                        {navMin ? "" : upperCaseFirstSentence(btn.label, "_")}
                    </SideNavBtn>
                )
            }
        })
    }, [contractNavBtns, switchTab, currentTab, navMin]);

    return (
        <div className={`app ${styles.app}`}>
            <Header title="Contracts" description="Project management app. Contracts Page." />
            <div className={`content ${styles.content}`}>
                <SideNav
                    switchBtns={[...navSwitchBtns]}
                    isMinNav={(isMinVal) => {
                        setNavMin(isMinVal);
                    }}
                />
                <div className={styles.content_view}>
                    <TopNav />
                    <HomePageCurrentTab />
                </div>
            </div>
            {modal.open == true && <Modal data={modal.data} />}
        </div>
    )
}