import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/components/reusable/inputs/dropdownInput.module.scss";
import { DropdownMultiOptionChoosenWidget } from "./DropdownMultiOptionChoosenWidget";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};


export type DropdownOptionType = {
  label: string | number;
  value: string | number;
};

// export interface Dropdown_Props<T extends DropdownOptionType | DropdownOptionType[]> {
//   placeHolder: string;
//   options: DropdownOptionType[];
//   isMulti: T extends (infer D) ? D extends DropdownOptionType[] ? true : false : false
//   isSearchable: boolean,
//   onChange: (value: T extends DropdownOptionType ? DropdownOptionType : DropdownOptionType[]) => void
// }

export interface Dropdown_Props {
  placeHolder?: string;
  options: DropdownOptionType[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange?: (value: DropdownOptionType[]) => void;
}

export const DropdownInput = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange
}: Dropdown_Props): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    single: DropdownOptionType;
    multi: DropdownOptionType[];
  }>({
    single: {
      label: "",
      value: ""
    },
    multi: []
  });
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();
  const [availableOptions, setAvailableOptions] = useState<
    DropdownOptionType[]
  >([...options]);

  function handleCancel(option: DropdownOptionType) {
    // handle cancel action
    if (isMulti) {
      // filter the multi values
      console.log(
        [...selectedValue.multi].filter((opt) => opt.value !== option.value)
      );
      setSelectedValue((prevVal) => ({
        ...prevVal,
        multi: [...prevVal.multi].filter((opt) => opt.value !== option.value)
      }));
      // return the canceled option back to the available options list
      setAvailableOptions((prevOpts) => [...prevOpts, option]);
    } else {
      // remove single element
      setSelectedValue((prevVals) => ({
        ...prevVals,
        single: {
          label: "",
          value: ""
        }
      }));
    }
  }

  function renderChoosenOptions() {
    if (isMulti) {
      return selectedValue.multi.map((valOption, ix) => (
        <DropdownMultiOptionChoosenWidget
          label={valOption.label}
          value={valOption.value}
          key={ix}
          onCancel={(e) => {
            handleCancel({ label: valOption.label, value: valOption.value });
          }}
        />
      ));
    } else {
      return <h3>{selectedValue.single.label}</h3>;
    }
  }

  useEffect(() => {
    const clickHandler = (e: any) => {
      setShowMenu(false);
    };

    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);

  function handleSelect(option: DropdownOptionType) {
    if (isMulti) {
      // push to multi array
      setSelectedValue((prevOptions) => ({
        ...prevOptions,
        multi: [...prevOptions.multi, option]
      }));
      // remove the option from the available list of options
      setAvailableOptions((prevOpts) =>
        [...prevOpts].filter((opt) => opt.value !== option.value)
      );
      
      onChange && onChange(selectedValue.multi);
    } else {
      // replace current option in single
      setSelectedValue((prevOptions) => ({
        ...prevOptions,
        single: option
      }));
      
      onChange && onChange([selectedValue.single]);
    }
  }

  function toggleShowMenu() {
    if (showMenu === true) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }

  return (
    <div
      className={styles.dropdown_wrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.dropdown_input_wrapper}>
        <div className={styles.dropdown_input}>
          {isMulti ? (
            selectedValue.multi.length > 0 ? (
              renderChoosenOptions()
            ) : placeHolder ? (
              <h3 className={styles.dropdown_input_placeholder}>{placeHolder}</h3>
            ) : (
              <h3 className={styles.dropdown_input_placeholder}>Choose an option</h3>
            )
          ) : [...Object.values(selectedValue.single)].every(Boolean) ? (
            renderChoosenOptions()
          ) : placeHolder ? (
            <h3 className={styles.dropdown_input_placeholder}>{placeHolder}</h3>
          ) : (
            <h3 className={styles.dropdown_input_placeholder}>Choose an option</h3>
          )}
        </div>
        <span className={styles.dropdown_chevron_trigger}>
          <button
            onClick={() => {
              toggleShowMenu();
            }}
          >
            <Icon />
          </button>
        </span>
      </div>
      {showMenu && (
        <div className={styles.dropdown_menu_wrapper}>
          <ul>
            {availableOptions.length > 0 ? (
              availableOptions.map((opt, ix) => (
                <li
                  key={ix}
                  onClick={() => {
                    handleSelect(opt);
                  }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className={styles.no_available_options} key={2}>
                No more options available...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
