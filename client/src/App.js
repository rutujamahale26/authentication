import "./App.css";

import RegistrationForm from "./components/Registration/RegistrationForm.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login/Login.jsx";
import AdminDashboard from "./components/Admin/Admin.jsx";
import Home from "./components/Home/Home.jsx";
 
function App() {
  return <>
  
  <BrowserRouter>
  <Routes>
    <Route path="/register" element={<RegistrationForm/>} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/admin" element={<AdminDashboard/>} />
    <Route path="/" element={<Home/>} />
  </Routes>
  </BrowserRouter>
  </>;
}

export default App;
