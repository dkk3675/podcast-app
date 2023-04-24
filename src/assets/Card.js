import React, { useEffect } from "react";
import Podcast from "./podcast.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../index.css";

const Card = ({ name, speaker, category, type, description, videos }) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    try {
      const useData = {
        email: sessionStorage.getItem("email"),
        podcast_name: name,
      };
      axios
        .post(`${process.env.REACT_APP_LOGIN_URI}/isLiked`, useData)
        .then((res) => {
          console.log(res.data);
          setIsLiked(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [name]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        email: sessionStorage.getItem("email"),
        podcast_name: name,
        isLiked: !isLiked,
      };
      await axios
        .post(`${process.env.REACT_APP_LOGIN_URI}/button-click`, userData)
        .then((res) => {
          console.log(res.data);
          setIsLiked(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const videoContainerStyle = {
    position: "relative",
    width: `100%`,
    height: `300px`,
    overflow: "hidden",
  };

  const videoStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="m-5 flex flex-wrap flex-col w-96 bg-slate-600 text-white rounded-lg">
      <div className="flex flex-wrap h-30 w-96 items-center justify-center pb-2">
        {videos.map((video, index) => {
          return (
            <div key={index} style={videoContainerStyle}>
              <video
                preload="auto"
                controls
                poster={Podcast}
                className="rounded-lg"
                style={videoStyle}
              >
                <source src={`${process.env.REACT_APP_BACKEND_URI}${video}`} />
                ;Your browser does not support the video tag.
              </video>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap h-40 w-full items-center p-5">
        <span>
          <h1 className="text-2xl font-bold">{name}</h1>
          <h2 className="text-lg font-medium">{speaker}</h2>
          <h3 className="text-base font-medium">Genre : {category}</h3>
          <h3 className="text-base font-medium">Type : {type}</h3>
          <p className="flex flex-wrap hover:h-12 w-80 overflow-hidden text-ellipsis line-clamp-2 hover:line-clamp-none hover:text-left hover:overflow-y-scroll scroll">
            Description : {description}
          </p>
        </span>
      </div>
      <div className="flex flex-wrap w-full h-20 items-center justify-center">
        <button
          onClick={handleSubmit}
          className="rounded-full bg-transparent w-10 h-10 hover:bg-slate-700 p-2"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`cursor-pointer ${
              isLiked ? "text-red-600" : "text-white"
            } w-5 h-6`}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
