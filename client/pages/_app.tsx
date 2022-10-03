import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ModalCtxProvider, LayoutCtxProvider } from "../providers";
import { AuthGuard } from "../components";
import { NextComponentType } from "next";
import type { PageAuth } from "../types";

interface Props extends AppProps {
  Component: NextComponentType & PageAuth;
  pageProps: {
    session: Session;
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <SessionProvider session={session}>
      <LayoutCtxProvider>
        <ModalCtxProvider>
          {Component.requireAuth?.auth === true ? (
            <AuthGuard
              userType={Component.requireAuth.userType}
              multipleUserTypes={Component.requireAuth.multipleUserTypes}
            >
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </ModalCtxProvider>
      </LayoutCtxProvider>
    </SessionProvider>
  );
}

export default MyApp;
