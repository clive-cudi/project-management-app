import { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from "react"
import styles from "../../../styles/components/reusable/inputs/searchInput.module.scss";
import { FiSearch } from "react-icons/fi";

interface SearchInput_Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    iconAlt?: React.ReactNode | JSX.Element
}

export const SearchInput = ({ onChange, iconAlt, ...otherInputProps }: SearchInput_Props) => {
    return (
        <div className={styles.search_input_wrapper}>
            <span>{iconAlt ?? <FiSearch />}</span>
            <input type="text" name="search_query" id="query" placeholder="Search for anything..." onChange={onChange} {...otherInputProps} />
        </div>
    )
}