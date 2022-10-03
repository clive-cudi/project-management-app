interface TabViewcontainer_Props {
    component: React.ReactNode
}

export const TabViewContainer = ({component}: TabViewcontainer_Props) => {
    return (
        <div>
            {component}
        </div>
    )
}