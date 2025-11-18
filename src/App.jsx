import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegistrationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./context/ProtectedRoute";
import Layout from "./pages/parts/Layout";

import HomePage from "./pages";
import AboutPage from "./pages/about/AboutPage";
import ListContact from "./pages/contacts/ListContact";
import AddContact from "./pages/contacts/AddContact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Main Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Contacts */}
            <Route path="/contacts" element={<ListContact />} />
            <Route path="/contact/add" element={<AddContact />} />
            <Route path="/contact/edit/:id" element={<AddContact />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
