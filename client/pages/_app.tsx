import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props extends AppProps {
  pageProps: {
    session: Session;
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    // <SessionProvider session={session}>
      <Component {...pageProps} />
    // </SessionProvider>
  )
}

export default MyApp;
