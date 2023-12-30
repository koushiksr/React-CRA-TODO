import DataList from "../DataList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Child } from "./Child";
import Dashboard from "../Dashboard";

function Authenticated() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex  justify-center min-h-screen  bg-gray-100">
                <div className="max-w-md w-full space-y-8">
                  <h1 className="text-3xl font-bold text-center mb-4">
                    Welcome to dashboard
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      to="dashboard"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Todo APP
                    </Link>
                    <Link
                      to="dashboard/child"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Profile
                    </Link>
                    {/* <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75"
                    >
                      Back to Login
                    </Link> */}
                  </div>
                </div>
              </div>
            }
          />
          <Route element={<Dashboard />}>
            <Route path="/dashboard/" element={<DataList />} />
            <Route path="/dashboard/child" element={<Child />} />
          </Route>
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-screen">
                <h1>Page not found</h1>
                <p>
                  Please <Link to="/">log in</Link> to access this page.
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Authenticated;
