import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import { verifyUserLogin } from "./authProvider/Auth";
import Authenticated from "./components/protectedRoutes/Authenticated";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    verifyUserLogin(setIsLoggedIn);
    // console.log("usefeefey", a);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Authenticated />
      ) : (
        <AuthForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </>

    // <BrowserRouter>
    //   <Routes>
    //     {!isLoggedIn ? (
    //       <Route path="/" element={<AuthForm />} />
    //     ) : (
    //       <Route element={<ProtectedRoutes />}>
    //         <Route path="/datalist" element={<DataList />} />
    //         <Route path="/dashboard" element={<Child2 />} />
    //       </Route>
    //     )}
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
