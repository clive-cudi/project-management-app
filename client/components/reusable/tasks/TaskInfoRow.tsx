import type { Badge_Props } from "../general/Badge";
import styles from "../../../styles/components/reusable/tasks/taskInfoRow.module.scss";

interface TaskInfoRow_Props {
    label: string,
    badge: Badge_Props
    isChecked?: boolean
}

export const TaskInfoRow = ({label, badge}: TaskInfoRow_Props) => {
    return (
        <div>

        </div>
    )
}