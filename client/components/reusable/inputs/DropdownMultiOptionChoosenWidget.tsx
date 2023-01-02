import { DropdownOptionType } from "./DropdownInput";
import styles from "../../../styles/components/reusable/inputs/dropdownInput.module.scss";

const CloseIcon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
      </svg>
    );
};

export function DropdownMultiOptionChoosenWidget({
    label,
    value,
    onCancel
  }: DropdownOptionType & {
    onCancel: (
      event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
      value: {label: string | number, value: string | number}
    ) => void;
  }) {
    return (
      <span className={styles.dmochw_wrapper}>
        {label}
        <button
          onClick={(e) => {
            onCancel(e, {label, value});
          }}
        >
          <CloseIcon />
        </button>
      </span>
    );
  }