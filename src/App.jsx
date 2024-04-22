import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoutes";
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const DoTransaction = React.lazy(() =>
  import("./pages/transaction/TransactionForm")
);
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const UserTransaction = React.lazy(() =>
  import("./pages/transaction/TransactionUser")
);
const NotFoundPage = React.lazy(() => import("./utils/PageNotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/transaction/do" element={<DoTransaction />} />
            <Route path="/transaction/user" element={<UserTransaction />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
