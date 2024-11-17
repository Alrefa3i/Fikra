import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import { CartProvider } from "react-use-cart";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ACCESS_REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import "./App.css";
import "./main.css";
import Footer from "./components/Footer";
import Sessions from "./pages/Sessions/Sessions";
import Session from "./pages/Sessions/Session/Session";
import Profile from "./pages/profile/Profile";
import api from "./api";
import ProductedRoute from "./components/ProductedRoute";
import Dashboard from "./Dashboard/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import BecomeTeacher from "./pages/BecomeTeacher/BecomeTeacher";
function Logout() {
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(ACCESS_REFRESH_TOKEN);
  return <Navigate to={"/login"} />;
}

function RegisterAndLogout() {
  sessionStorage.clear();
  return <Register />;
}

function App() {
  const [theme, setTheme] = React.useState("light");


  return (
    <CartProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<><Header /><Home /><Footer /></>} />
              <Route path="/sections">
                <Route index element={<><Header /><Sessions /><Footer /></>} />
                <Route path=":id" element={<><Header /><ProductedRoute><Session /></ProductedRoute><Footer /></>} />
              </Route>
              <Route path="/teachers/:id" element={<><Header /><Profile /><Footer /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProductedRoute><Dashboard /></ProductedRoute>} />
              <Route path="/register" element={<RegisterAndLogout />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/BecomeTeacher" element={<><Header /><BecomeTeacher /><Footer /></>} />

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;