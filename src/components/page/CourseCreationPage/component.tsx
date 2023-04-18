// import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

// import { API_URL } from "../../../../core/config";
import { PageTemplate } from "../../templates";
import { difficultyOptions } from "../ProblemCreationPage/selectorOptions";

export const CourseCreationPage = () => {
  const router = useRouter();
  const [trackTitle, setTrackTitle] = useState("");
  const [numberOfProblems, setNumberOfProblems] = useState(0);
  const [difficulty, setDifficulty] = useState({
    value: "Easy",
    label: "Easy",
  });
  const [picture, setPicture] = useState("");

  const handleSubmit = async () => {
    if (!trackTitle || !numberOfProblems || !difficulty || !picture) {
      toast.error("Please fill all fields");
      return;
    }
    const data = {
      title: trackTitle,
      difficulty: difficulty.value,
      numberOfProblems,
      picture,
    };

    try {
      // TODO: add endpoint
      // const response = await axios.post(`${API_URL}/tracks`, data);
      toast.success("Track created successfully");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }

    console.log("data", data);
  };

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <div className="flex justify-center mb-8 align-center">
          <div className="justify-center w-1/3">
            <p className="text-2xl font-bold text-white">Create track</p>
            <div className="my-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Title <span style={{ color: "red" }}>*</span>
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
                Difficulty <span style={{ color: "red" }}>*</span>
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
                Number of problems <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Number of problems (numeric)"
                value={numberOfProblems}
                onChange={(e) => setNumberOfProblems(Number(e.target.value))}
              />
            </div>
            <div className="mb-8">
              <p
                className="mb-2 text-lg font-bold text-white"
                style={{ color: "#9FAEC8" }}
              >
                Upload an image <span style={{ color: "red" }}>*</span>
              </p>
              <input
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                type="file"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
