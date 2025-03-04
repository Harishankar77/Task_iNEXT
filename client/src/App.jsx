import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import UserList from "./components/UserList.jsx";
import UserView from "./components/Userview.jsx";
import UserEdit from "./components/UserEdit.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/userview/:id" element={<UserView />} />
        <Route path="/useredit/:id" element={<UserEdit />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
