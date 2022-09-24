import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ModalCtxProvider } from "../providers";

interface Props extends AppProps {
  pageProps: {
    session: Session;
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    // <SessionProvider session={session}>
      <ModalCtxProvider>
        <Component {...pageProps} />
      </ModalCtxProvider>
    // </SessionProvider>
  )
}

export default MyApp;
