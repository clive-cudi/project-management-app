import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import {
  ModalCtxProvider,
  LayoutCtxProvider,
  SettingsTabCtxProvider,
  RoutingCtxProvider,
  TabRenderCtxProvider,
  ContextMenuCtxProvider,
  GlobalLoadingCtxProvider,
  NotificationPlateCtxProvider,
} from "../providers";
import { AuthGuard } from "../components";
import { NextComponentType } from "next";
import type { PageAuth } from "../types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props extends AppProps {
  Component: NextComponentType & PageAuth;
  pageProps: {
    session: Session;
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      {/* <Header>
        <meta name="color-scheme" content="only light" />
      </Header> */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RoutingCtxProvider>
          <ContextMenuCtxProvider>
            <TabRenderCtxProvider>
              <LayoutCtxProvider>
                <ModalCtxProvider>
                  <NotificationPlateCtxProvider>
                    <GlobalLoadingCtxProvider>
                      <SettingsTabCtxProvider>
                        {Component.requireAuth?.auth === true ? (
                          <AuthGuard
                            userType={Component.requireAuth.userType}
                            multipleUserTypes={
                              Component.requireAuth.multipleUserTypes
                            }
                          >
                            <Component {...pageProps} />
                          </AuthGuard>
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </SettingsTabCtxProvider>
                    </GlobalLoadingCtxProvider>
                  </NotificationPlateCtxProvider>
                </ModalCtxProvider>
              </LayoutCtxProvider>
            </TabRenderCtxProvider>
          </ContextMenuCtxProvider>
        </RoutingCtxProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
