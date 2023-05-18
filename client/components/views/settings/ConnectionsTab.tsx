import { useState } from "react";
import styles from "../../../styles/views/settings/connectionsTab.module.scss";
import Image from "next/image";

export const ConnectionsTab = (): JSX.Element => {
    const [integrations, setIntegrations] = useState([
        {
            label: "Google Calendar",
            icon: <Image src={"/logos/google-calendar.png"} layout={"fill"} alt={"@"} />,
            content: "Create, edit, and share spreadsheets wherever you are with Google Sheets."
        },
        {
            label: "Slack",
            icon: <Image src={`/logos/slack.png`} layout={"fill"} alt={"@"} />,
            content: "Slack is a platform for team communication: everything in one place."
        },
        {
            label: "Google Drive",
            icon: <Image src={`/logos/google-drive.png`} layout={"fill"} alt={"@"} />,
            content: "Google Drive is Google's file sync app that lets you store all of your files online."
        },
        {
            label: "Calendly",
            icon: <Image src={`/logos/calendar.png`} layout={"fill"} alt={"@"} />,
            content: "Calendly is an elegant and simple scheduling tool for businesses that eliminates email back and forth."
        },
        {
            label: "Outlook",
            icon: <Image src={`/logos/outlook.png`} layout={"fill"} alt={"@"} />,
            content: "Microsoft Outlook is a web-based suite of webmail, contacts, tasks, and calendaring services."
        },
        {
            label: "Github",
            icon: <Image src={`/logos/github.png`} layout={"fill"} alt={"@"} />,
            content: "Cloud based distributed version control for software."
        },
        {
            label: "Google Sheets",
            icon: <Image src={`/logos/google-sheets.png`} layout={"fill"} alt={"@"} />,
            content: "Create, edit, and share spreadsheets wherever you are with Google Sheets, and get automated insights from your data."
        },
        {
            label: "Twilio",
            icon: "",
            content: "provides programmable communication tools for making and receiving phone calls, sending and receiving text messages etc."
        },
    ]);

    return (
        <div className={styles.security_tab_content}>
            <div className={styles.st_nav_wrapper}>
                <div className={styles.st_nav_content}>
                    <div className={styles.st_nav_col}>
                        <span>
                            <h4>Integrations</h4>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.st_content_view_wrapper}>
                {/* grid */}
                <div className={styles.ct_integrations_wrapper}>
                    {integrations.map((integration) => {
                        return (
                            <div key={crypto.randomUUID()} className={styles.ct_int_widget}>
                                <div className={styles.ct_int_col}>
                                    <span className={styles.ct_int_icon}>{integration.icon}</span>
                                </div>
                                <div className={styles.ct_int_col}>
                                    <span className={styles.ct_int_title}>{integration.label}</span>
                                    <p className={styles.ct_int_info}>{integration.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}