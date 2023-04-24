import React from "react";
import { useState } from "react";
import axios from "axios";

const Upload = ({ getAllMedias }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    type: "Audio",
    speaker: "",
    file: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("description", formData.description);
    formdata.append("category", formData.category);
    formdata.append("type", formData.type);
    formdata.append("speaker", formData.speaker);
    for (let key in formData.file) {
      formdata.append("videos", formData.file[key]);
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/media/create`, formdata)
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
    // window.location.reload();
  };
  return (
    <div className="flex flex-wrap w-full justify-center items-center">
      <div className="flex flex-wrap w-[450px] justify-center items-center">
        <h1 className="text-5xl font-bold m-5">Upload Podcast</h1>
        <form onSubmit={handleSubmit} className="mt-10 w-[450px]">
          <div className="m-5">
            <label>
              Podcast Name<span className="text-red-700">*</span>&nbsp;&nbsp;
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-96 h-10 p-5 bg-slate-600 rounded-lg text-white font-bold"
              required
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="m-5">
            <label>
              Podcast Description<span className="text-red-700">*</span>
              &nbsp;&nbsp;
            </label>
            <textarea
              placeholder="Description"
              className="w-96 h-40 p-5 bg-slate-600 rounded-lg text-white font-bold"
              required
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </div>
          <div className="m-5">
            <label>
              Podcast Category<span className="text-red-700">*</span>
              &nbsp;&nbsp;
            </label>
            <select
              name="genre"
              id="genre"
              className="w-96 h-10 p-2 rounded-lg font-bold text-white bg-slate-600"
              required
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
            >
              <option value="Comedy">Comedy</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Music">Music</option>
              <option value="News">News</option>
            </select>
          </div>
          <div className="m-5">
            <label>
              Podcast Type<span className="text-red-700">*</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="radio"
              id="audio"
              name="Type"
              value="Audio"
              checked={formData.type === "Audio"}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            />
            &nbsp;
            <label>Audio</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              id="video"
              name="Type"
              value="Video"
              checked={formData.type === "Video"}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            />
            &nbsp;
            <label>Video</label>
          </div>
          <div className="m-5">
            <label>
              Podcast Speaker<span className="text-red-700">*</span>&nbsp;&nbsp;
            </label>
            <input
              type="text"
              placeholder="Speaker"
              className="w-96 h-10 p-5 bg-slate-600 rounded-lg text-white font-bold"
              required
              onChange={(e) => {
                setFormData({ ...formData, speaker: e.target.value });
              }}
            />
          </div>
          <div className="m-5">
            <label>
              File Upload<span className="text-red-700">*</span>&nbsp;&nbsp;
            </label>
            <input
              type="file"
              placeholder="Upload"
              className="w-96 h-10"
              required
              multiple
              accept=".mp4, .mkv"
              onChange={(e) => {
                setFormData({ ...formData, file: e.target.files });
              }}
            />
          </div>
          <div className="m-5">
            <button
              type="submit"
              className="w-92 h-10 p-2 text-white bg-slate-600 rounded-lg"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
