import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import Authenticated from "./components/protectedRoutes/Authenticated";
import { useVerifyUserLogin } from "./authProvider/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useVerifyUserLogin(setIsLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <Authenticated />
      ) : (
        <AuthForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
