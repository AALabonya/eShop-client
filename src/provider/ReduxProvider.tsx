"use client";
import { NextUIProvider } from "@nextui-org/system";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { persistor, store } from "@/redux/store";
import { useRouter } from "next/navigation";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors={true} />
      <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider  navigate={router.push}>
          {children}
          <Toaster />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
