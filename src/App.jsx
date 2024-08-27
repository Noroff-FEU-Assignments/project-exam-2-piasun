import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import NavBar from "./components/layout/NavLayout";
import HomePage from './pages/home';
import Login from "./components/login/LoginPage";
import Register from "./components/login/register";
import UserProfilePage from "./components/profiles/UserProfilePage";
import Posts from "./components/posts/Posts";

function App () {
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:name" element={<UserProfilePage />} />
          <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};
 
export default App;