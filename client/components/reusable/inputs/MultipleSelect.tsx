type MultipleSelectOption = {
    label: string,
    value: string
}

interface MultipleSelect_Props {
    options: MultipleSelectOption[]
    value?: MultipleSelectOption
    onChange: (value?: MultipleSelectOption) => void
}

export const MultipleSelect = (): JSX.Element => {
    return (
        <div></div>
    )
}