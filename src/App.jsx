import React, { Suspense, lazy } from "react";

import Loader from "./components/body/Loader";
import UserProvider from "./context/UserProvider";
import AccountProvider from "./context/AccountProvider";
const Path = lazy(() => import("./routes/Path"));

function App() {
  return (
    <>
      <UserProvider>
        <AccountProvider>
          <Suspense fallback={<Loader />}>
            <Path />
          </Suspense>
        </AccountProvider>
      </UserProvider>
    </>
  );
}

export default App;
