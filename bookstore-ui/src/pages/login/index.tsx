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
      <div className="inline-block bg-eggshell shadow-lg mx-auto mt-8 rounded border-2 border-solid border-gray-300 px-8 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Login</h1>
        <button
          className="font-semibold text-slate-900 shadow-sm border-2 border-solid border-slate-900 rounded-2xl px-4 mt-4"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
      <div className="mt-8 text-sm">Login with your gmail account</div>
    </div>
  );
};

export default Login;
