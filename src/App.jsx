import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages";
import ProtectedRoute from "./context/ProtectedRoute";
import AboutPage from "./pages/about/AboutPage";
import ListContact from "./pages/contacts/ListContact";
import RegisterPage from "./pages/auth/RegistrationPage";
import CreateContact from "./pages/contacts/CreateContact";
import EditContact from "./pages/contacts/EditContact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />

          {/* ✅ CONTACT CRUD ROUTES */}
          <Route path="contacts" element={<ListContact />} />
          <Route path="contacts/create" element={<CreateContact />} />

          {/* ✅ Based on API docs (POST `/contact/update/:id`) */}
          <Route path="contacts/edit/:id" element={<EditContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;