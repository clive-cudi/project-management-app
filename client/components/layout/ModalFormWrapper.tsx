import { IconBtn } from "../reusable";
import styles from "../../styles/components/layout/modalFormWrapper.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "../../hooks";

interface ModalFormWrapper_Props {
    form: JSX.Element | React.ReactNode
    title?: string
    footer?: string
    children?: any
    className?: string
    childrenContClassName?: string
}

export const ModalFormWrapper = ({form, title, footer, children, className, childrenContClassName }: ModalFormWrapper_Props) => {
    const { closeModal } = useModal();

    return (
        <div className={`${styles.modal_form_wrapper} ${className ?? ""}`}>
            {
                title && 
                <div className={styles.mf_header}>
                    <h4>
                        {title}
                    </h4>
                    <IconBtn icon={<AiOutlineClose />} variant={'text'} onClick={()=>{
                        closeModal();
                    }} />
                </div>
            }
            <div className={`${styles.mf_form} ${childrenContClassName ?? ""}`}>
                {form ?? children}
            </div>
            {
                footer && 
                <div className={styles.mf_footer}>
                    {footer}
                </div>
            }
        </div>
    )
}