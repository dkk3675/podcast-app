import React from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import axios from "axios";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [inDashboard, setInDashboard] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("------------");
  const [createAccount, setCreateAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("isLogged") === "true") {
      setIsLogged(true);
    }
    if (sessionStorage.getItem("name") !== "------------") {
      let a = sessionStorage.getItem("name");
      setName(a);
    }
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  const [medias, setMedias] = useState([]);
  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <div className="max-w-full">
      <Navbar
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        inDashboard={inDashboard}
        setInDashboard={setInDashboard}
        name={name}
        isAdmin={isAdmin}
      />
      {isLogged ? (
        inDashboard ? (
          <Dashboard medias={medias} />
        ) : (
          <Upload getAllMedias={getAllMedias} />
        )
      ) : createAccount ? (
        <Signup setCreateAccount={setCreateAccount} />
      ) : (
        <Login setCreateAccount={setCreateAccount} setIsLogged={setIsLogged} setIsAdmin={setIsAdmin} />
      )}
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login setIsLogged={setIsLogged} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route
            path="*"
            element={
              <h1 className="w-full flex flex-wrap justify-center items-center h-screen text-3xl font-extrabold">
                Resource Not Found
              </h1>
            }
          />
        </Routes>
      </BrowserRouter> */}
      {/* {inDashboard ? <Dashboard /> : <Upload />} */}
      {/* <Login /> */}
      {/* <Signup /> */}
    </div>
  );
}

export default App;
