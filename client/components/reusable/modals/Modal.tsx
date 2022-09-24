import React,{ useEffect } from "react";
import styles from "../../../styles/components/reusable/modals/modal.module.scss";
import { useModal } from "../../../hooks";

interface modalPropTypes {
    data: any,
    styling?: React.CSSProperties,
    autoClose?: {
        closeTimeOut: number
    }
    outerClickClose?: boolean
}

export function Modal({data, styling, autoClose, outerClickClose}: modalPropTypes):JSX.Element {
    const { modal, closeModal } = useModal();

    return (
        <div className={styles.modal_main_wrapper} style={{...styling}} onClick={(e)=>{
            closeModal()
        }}>
            <div className={`${styles.modal_content} ${modal.open == false ? styles.modal_out : ''}`} onClick={(e)=>{e.stopPropagation()}}>
                {data}
            </div>
        </div>
    )
}