import { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from "react"
import styles from "../../../styles/components/reusable/inputs/searchInput.module.scss";

interface SearchInput_Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const SearchInput = ({ onChange }: SearchInput_Props) => {
    return (
        <div className={styles.search_input_wrapper}>
            <input type="text" name="search_query" id="query" placeholder="Search for anything..." onChange={onChange} />
        </div>
    )
}