import React from "react";
// import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useState } from "react";

const Signup = ({ setCreateAccount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleGoogleSignupSuccess = async (response) => {
  //     // try {
  //     //   const userData = {
  //     //     email: response.profileObj.email,
  //     //     name: response.profileObj.name,
  //     //   };
  //     //   await axios.post("/api/signup/google", userData);
  //     // //   navigate("/dashboard");
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //     console.log(response);
  //   };

  //   const handleGoogleSignupFailure = (error) => {
  //     navigate("/dashboard");
  //     console.error(error);
  //   };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        password,
        };
      await axios
        .post(`${process.env.REACT_APP_LOGIN_URI}/register`, userData)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        });
    } catch (error) {
      console.error(error);
      alert("Signup Unsuccessful");
    }
    setCreateAccount(false);
  };

  return (
    <div className="flex flex-wrap flex-col h-screen w-full bg-slate-600 items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="flex flex-wrap flex-col w-1/2 bg-white p-5 rounded-xl"
      >
        <div className="flex flex-wrap flex-row w-full justify-center">
          <h1 className="text-2xl font-bold">Signup</h1>
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <input
            type="text"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2"
            placeholder="Username"
            required
            onChange={(e) => {
              if (e.target.value !== " " || e.target.value !== "@") {
                setName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <input
            type="email"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <input
            type="password"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <button
            type="submit"
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2 bg-red-600 text-white font-bold"
          >
            Signup
          </button>
        </div>
        {/* <div className="flex flex-wrap flex-row w-full justify-center">
          <h1 className="text-lg font-bold">OR</h1>
        </div>
        <div className="flex flex-wrap flex-row w-full justify-center">
          <GoogleLogin
            className="w-1/2 h-12 rounded-xl border-2 border-gray-400 p-2 m-2 bg-red-600 text-white font-bold"
            clientId="714108542477-17rhklprv5o8tvb0maq84s2977fbsn81.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={handleGoogleSignupSuccess}
            onFailure={handleGoogleSignupFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div> */}
      </form>
    </div>
  );
};

export default Signup;
