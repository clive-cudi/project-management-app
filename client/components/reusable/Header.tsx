import Head from "next/head";

interface Header_props {
    title?: string
    description?: string
}

export const Header = ({title, description}: Header_props): JSX.Element => {
    return (
        <Head>
            <title>{title ?? "Project Management App"}</title>
            <meta name="description" content={description ?? "Project Management Software."} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}