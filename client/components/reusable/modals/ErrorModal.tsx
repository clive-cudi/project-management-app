import { ReactNode } from "react";
import styles from "../../../styles/components/reusable/modals/errorModal.module.scss";
import { useModal } from "../../../hooks";
import { GoAlert } from 'react-icons/go';
import { useRouter } from "next/router";

interface ErrorModalPropTypes {
    message: string
    redirectUrl?: string
    icon?: JSX.Element | ReactNode
    title?: string
    btn_label?: string
    btn_onclick?: ()=> void
    disable_close_btn?: boolean
}

export function ErrorModal({message, redirectUrl, icon, title, btn_label, btn_onclick, disable_close_btn}: ErrorModalPropTypes): JSX.Element{
    const { closeModal } = useModal();
    const router = useRouter();

    function redirect(url: string){
        router.push(url)
    }

    return (
        <div className={styles.err_wrapper}>
            <div className={styles.err_icon}>
                {icon ? icon : <GoAlert  fontSize={50} color='crimson' /> }
            </div>
            <div className={styles.err_info}>
                {/* <h2>{title ? title : `Error !`}</h2> */}
                <p>{message}</p>
                <div className={styles.err_btns}>
                    <button onClick={()=>{
                        redirectUrl && redirect(redirectUrl);
                        if (disable_close_btn !== true){
                            closeModal()
                        }
                        btn_onclick && btn_onclick()
                    }}>{btn_label ? btn_label : `Ok, Try Again`}</button>
                </div>
            </div>
        </div>
    )
}