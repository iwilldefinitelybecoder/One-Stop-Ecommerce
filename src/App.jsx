import React, { Suspense, lazy } from "react";

import Loader from "./components/body/Loader";
import UserProvider from "./context/UserProvider";
import AccountProvider from "./context/AccountProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Path = lazy(() => import("./routes/Path"));


function App() {
  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_REDIRECT_URI}  >
      <UserProvider>
        <AccountProvider>
          <Suspense fallback={<Loader />}>
            <Path />
          </Suspense>
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;
