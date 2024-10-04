// src/Login.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@services/firebase";
import { useNavigate } from "react-router-dom";
import { createUser, getUserById } from "src/api/users";
import { User } from "../../types/user";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      const user = result.user;
      const userData: User = {
        uid: user.uid,
        email: user.email ?? "",
        name: user.displayName ?? "",
      };

      const userExists = await getUserById(user.uid);

      if (userExists.status === 404) {
        await createUser(token, userData);
      }

      navigate("/books");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
