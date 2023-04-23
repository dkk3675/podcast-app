import React from "react";
import Card from "../assets/Card";
import { useState, useEffect } from "react";

const Dashboard = ({ medias }) => {
  const [search, setSearch] = useState("");
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    setFilteredDetails(
      medias.filter((media) =>
        media.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, medias]);

  return (
    <div className="flex flex-wrap flex-col w-full p-5">
      <div className="flex flex-wrap flex-row h-20 w-full items-center">
        <h1 className="flex flex-wrap justify-start w-1/2 text-2xl font-bold">
          Popular Podcasts
        </h1>
        <div className="flex flex-wrap justify-end w-1/2 text-white font-semibold">
          <input
            type="text"
            name="search"
            placeholder="Search using podcast name"
            className="w-72 h-10 rounded-lg bg-slate-600 p-5"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap h-[480px] w-full">
        <div className="flex w-full">
          <div className="flex flex-row overflow-x-scroll">
            {filteredDetails.length > 0 ? (
              filteredDetails.map((media, index) => {
                return (
                  <div key={index}>
                    <Card
                      name={media.name}
                      speaker={media.speaker}
                      category={media.category}
                      type={media.type}
                      description={media.description}
                      videos={media.videos}
                    />
                  </div>
                );
              })) : (
                <div className="flex flex-wrap w-screen h-full items-center justify-center text-black">
                  <h1 className="text-2xl font-bold">No Podcasts Found</h1>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
