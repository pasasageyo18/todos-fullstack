"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

export default function AllProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SessionProvider session={session}>{children}</SessionProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
