import styles from "../../../styles/components/reusable/general/notificationBadge.module.scss";
import { useNotificationPlateWidget } from "../../../hooks";
import { FcCancel } from "react-icons/fc";
import { OperationResultType_ } from "../../../types";

export interface NotificationBadge_Props {
    type: OperationResultType_
    text?: string
    isDismissable?: {
        status:boolean
        id: string
    }
    onClick?: () => void
    content?: JSX.Element
}

export const NotificationBadge = ({ type, text, isDismissable, onClick, content }: NotificationBadge_Props): JSX.Element => {
    const { removeFromNotificationStack } = useNotificationPlateWidget();

    return (
        <div className={`${styles.notification_badge_wrapper}`} onClick={onClick}>
            <span className={`${styles[`nbadge_${type}`]}`} data-elm-type = "nbadge-indicator"></span>
            <div className={styles.notification_badge_content}>
                {text ? text : (content ? content : null)}
            </div>
            {isDismissable?.status === true ? <span className={styles.nbadge_dismiss} onClick={() => {removeFromNotificationStack(isDismissable.id)}}><FcCancel /></span> : null}
        </div>
    )
}