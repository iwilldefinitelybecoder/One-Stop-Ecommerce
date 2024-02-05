import React, { Suspense, lazy } from "react";

import Loader from "./components/body/Loader";
import AccountProvider from "./context/AccountProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CartProvider from "./CustomHooks/CartHook";
import OrderProvider from "./context/OrderContext";
import ComponentProvider from "./context/ComponentProvider";

const Path = lazy(() => import("./routes/Path"));

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_REDIRECT_URI}>
        <ComponentProvider>
          <AccountProvider>
            <CartProvider>
              <OrderProvider>
                <Suspense fallback={<Loader />}>
                  <Path />
                </Suspense>
              </OrderProvider>
            </CartProvider>
          </AccountProvider>
        </ComponentProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
