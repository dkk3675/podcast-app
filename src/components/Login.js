import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = ({ setCreateAccount, setIsLogged,setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };
      await axios.post(`${process.env.REACT_APP_LOGIN_URI}/login`, userData)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.data.user) {
            setIsLogged(true);
            if (res.data.user.email === 'karan.boss1000@gmail.com') {
              setIsAdmin(true);
              sessionStorage.setItem("isAdmin", "true");
            } else {
              setIsAdmin(false);
              sessionStorage.setItem("isAdmin", "false");
            }
            sessionStorage.setItem("name", res.data.user.name);
            sessionStorage.setItem("isLogged", "true");
            sessionStorage.setItem("email", res.data.user.email);
          } else {
            sessionStorage.setItem("name", "------------");
            sessionStorage.setItem("isLogged", "false");
          }
        });
      window.location.reload();
    } catch (error) {
      console.error(error);
      sessionStorage.setItem("name", "------------");
      sessionStorage.setItem("isLogged", "false");
      alert("Login Unsuccessful");
      window.location.reload();
    }
  };
  return (
    <div className="flex flex-wrap flex-col h-screen w-full bg-slate-600 items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-wrap flex-col w-1/2 bg-white p-5 rounded-xl"
      >
        <div className="flex flex-wrap flex-row w-full justify-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <input
            type="email"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <input
            type="password"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          Don't have an account?&nbsp;&nbsp;
          <button
            onClick={() => {
              setCreateAccount(true);
            }}
            className="text-red-600"
          >
            Signup Here
          </button>
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <button
            type="submit"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2 bg-red-600 text-white font-bold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
