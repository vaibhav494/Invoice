import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import RootLayout from "./components/RootLayout";
import Dash from "./components/dash";
import AuthPage from "./Auth/AuthPage";
import Bill_detail from "./pages/bill_detail";
import Supplier from "./pages/supplier";
import DynamicTaxInvoice from "./components/dynamic-tax-invoice";
import Customer from "./pages/customer";
import Demo from "./chart/Demo";
import OtherExpense from "./pages/OtherExpense";
import BankDetail from "./pages/BankDetail";
import Dashboard from "./pages/Dashboard";
import All_bill_detail from "./admin/LoginPage";
import All_user from "./admin/LoginPage";
import { any } from "zod";
import LoginPage from "./admin/LoginPage";
import AdminDashboard from "./admin/AdminDashboard";
import UserDetail from "./admin/UserDetail";
import ProductCost from "./pages/ProductCost";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("adminLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  const ProtectedRoute: React.FC<{
    element: React.FC<{ handleLogout: () => void }>;
  }> = ({ element: Component }) => {
    return isLoggedIn ? (
      <Component handleLogout={handleLogout} />
    ) : (
      <Navigate to="/admin-login" />
    );
  };

  //const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [sssname, setSssname] = useState<string[]>([]);

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     if (!user) {
  //       console.log("User is not defined");
  //       setLoading(false);
  //       return; // Only run if the user exists
  //     }

  //     console.log("Checking admin status for user ID:", user.id);
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:4000/api/check?userId=${user.id}`
  //       );
  //       console.log("API response:", response.data);
  //       setIsAdmin(response.data === "true"); // Explicit comparison for string response
  //     } catch (error) {
  //       console.error("Error checking admin status:", error);
  //     } finally {
  //       setLoading(false); // Always set loading to false
  //     }
  //   };

  //   checkAdminStatus();
  // }, [user]); 

  useEffect(() => {
    axios
      .get("http://localhost:4000/insert")
      .then((response) => {
        setSssname(response.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route that is accessible without Clerk login */}
        <Route
          path="/admin-login"
          element={<LoginPage handleLogin={handleLogin} />}
        />

        {/* Protected routes for admin */}
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={AdminDashboard} />} // Ensure AdminDashboard is a valid component
        />
        <Route path="/user/:userId" element={<UserDetail />} />

        {/* Clerk-protected routes */}
        <Route
          element={
            <header>
              <SignedOut>
                <AuthPage />
              </SignedOut>
              <SignedIn>
                <RootLayout />
              </SignedIn>
            </header>
          }
        >
          <Route path="/" element={<Dash />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/bill_detail" element={<Bill_detail />} />
          <Route
            path="/invoice"
            element={<DynamicTaxInvoice  />}
          />
          <Route path="/dash" element={<Dash />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/chart" element={<Demo />} />
          <Route path="/other-expense" element={<OtherExpense />} />
          <Route path="/add-bank-detail" element={<BankDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-cost" element={<ProductCost/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
