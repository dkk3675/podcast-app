import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({
  isLogged,
  setIsLogged,
  inDashboard,
  setInDashboard,
  name,
  isAdmin,
}) => {
  const handleLogout = () => {
    sessionStorage.setItem("name", "------------");
    sessionStorage.setItem("isLogged", "false");
    sessionStorage.setItem("isAdmin", "false");
    sessionStorage.removeItem("email");
    setIsLogged(false);
    window.location.reload();
  };
  return (
    <div className="flex flex-wrap flex-row h-40 bg-slate-600 items-center p-5 text-white">
      {isLogged ? (
        <div className="flex flex-wrap w-1/2 justify-start">
          <h1 className="text-2xl font-bold">
            <FontAwesomeIcon icon={faPodcast} />
            &nbsp;&nbsp;StackDuo Podcasts
          </h1>
        </div>
      ) : (
        <div className="flex flex-wrap w-full justify-center">
          <h1 className="text-2xl font-bold">
            <FontAwesomeIcon icon={faPodcast} />
            &nbsp;&nbsp;StackDuo Podcasts
          </h1>
        </div>
      )}
      {isLogged && (
        <div className="flex flex-wrap flex-row w-1/2 justify-end items-center h-full">
          <div className="m-2 font-bold">
            Welcome {isAdmin ? "admin" : "user"}@{name}
          </div>
          {isAdmin && (
            <div className="m-2">
              <button
                className={`p-2 rounded-xl bg-red-600 w-24 h-12`}
                onClick={() => {
                  setInDashboard(!inDashboard);
                }}
              >
                {inDashboard ? "Upload" : "Dashboard"}
              </button>
            </div>
          )}
          <div className="m-2">
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-600 w-20 h-12"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
