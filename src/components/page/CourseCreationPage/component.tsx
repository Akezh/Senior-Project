// import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { axiosApi } from "../../../../core/config";
// import { API_URL } from "../../../../core/config";
import { PageTemplate } from "../../templates";
import {
  categoryOptions,
  difficultyOptions,
} from "../ProblemCreationPage/selectorOptions";

export const CourseCreationPage = () => {
  const router = useRouter();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackDescription, setTrackDescription] = useState("");
  const [category, setCategory] = useState({
    value: categoryOptions[0].value,
    label: categoryOptions[0].label,
  });
  const [difficulty, setDifficulty] = useState({
    value: "Easy",
    label: "Easy",
  });

  const handleSubmit = async () => {
    const data = {
      title: trackTitle,
      difficulty: difficulty.value,
    };

    try {
      // TODO: Dulat will solve CORS issues and this will work!
      axiosApi.post("/track", {
        title: trackTitle,
        category: category.value,
        difficulty: difficulty.value,
        description: trackDescription,
      });
      toast.success("Track created successfully");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }

    console.log("data", data);
  };

  return (
    <PageTemplate>
      <div className="mx-auto mt-12">
        <div className="flex justify-center mb-8 align-center">
          <div className="justify-center max-w-2xl">
            <p className="text-2xl font-bold text-white">Create track</p>
            <p className="mt-3 text-gray-400">
              This page allows you to create a separate track for your students
              to solve. You can add problems to the track later.
            </p>
            <div className="mt-6 mb-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Title <span className="text-red-500">*</span>
              </p>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                id="problemName"
                placeholder="Pick a title"
                value={trackTitle}
                onChange={(e) => setTrackTitle(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Category <span className="text-red-500">*</span>
              </p>
              <Select
                className="text-black"
                defaultValue={category}
                onChange={setCategory as never}
                options={categoryOptions}
                placeholder="Select Track"
              />
            </div>
            <div className="mb-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Difficulty <span className="text-red-500">*</span>
              </p>
              <Select
                className="text-black"
                defaultValue={difficulty}
                onChange={setDifficulty as never}
                options={difficultyOptions}
                placeholder="Select Track"
              />
            </div>
            <div className="mb-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Track description <span className="text-red-500">*</span>
              </p>
              <textarea
                className="w-full h-20 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Track description"
                value={trackDescription}
                onChange={(e) => setTrackDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 focus:outline-none dark:focus:ring-blue-800 disabled:bg-gray-700 transition-all disabled:cursor-not-allowed"
                disabled={!trackTitle || !trackDescription}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};
