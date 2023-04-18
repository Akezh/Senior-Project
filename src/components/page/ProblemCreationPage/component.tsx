import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import axios from "axios";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { API_URL } from "../../../../core/config";
import { PageTemplate } from "../../templates";
import { categoryOptions, difficultyOptions } from "./selectorOptions";

type TestCase = Record<
  number | string,
  {
    input: string;
    output: string;
  }
>;

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export const ProblemCreationPage = () => {
  const [stepperActive, setStepperActive] = useState(1);

  const [title, setTitle] = useState("");
  const [track, setTrack] = useState("");
  const [difficulty, setDifficulty] = useState({
    value: "Easy",
    label: "Easy",
  });
  const [categories, setCategories] = useState(null);
  const [description, setDescription] = useState("");
  const [solutions, setSolutions] = useState("");

  const [countTestCases, setCountTestCases] = useState(1);
  const [testCases, setTestCases] = useState<TestCase>({
    0: {
      input: "",
      output: "",
    },
  });

  const handleNext = () => {
    if (title && difficulty && categories && description) {
      setStepperActive((step) => step + 1);
    } else {
      toast.error("Please fill all the required fields");
    }
  };
  const handleBack = () => setStepperActive((step) => step - 1);
  const addTestCase = () => {
    setCountTestCases((prev) => prev + 1);

    setTestCases((prev) => ({
      ...prev,
      [countTestCases + 1]: {
        input: "",
        output: "",
      },
    }));
  };

  const removeTestCase = () => {
    setCountTestCases((prev) => prev - 1);
    setTestCases((prev) => {
      const newTestCases = { ...prev };
      delete newTestCases[countTestCases];
      return newTestCases;
    });
  };

  const handleSubmit = async () => {
    if (!testCases || Object.keys(testCases).length === 0) {
      toast.error("Please add test cases");
      return;
    }
    const problemData = {
      track,
      title,
      difficulty: difficulty.value,
      categories,
      description,
      solutions,
    };

    try {
      const response = await axios.post(`${API_URL}/problem`, problemData);
      if (!response.data.message) throw new Error("Error in creating problem");
      toast.success("Problem has been created successfully");

      const responseTestCase = await axios.post(
        `${API_URL}/problem/testcase`,
        testCases
      );
      if (!responseTestCase.data.message)
        throw new Error("Error in creating test cases");
      toast.success("Test cases has been created successfully");
    } catch (err) {
      console.log(err);
    }
    console.log("testCases", testCases);
  };

  const handleInputAreaChange = (
    fieldIndex: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTestCases((prev) => ({
      ...prev,
      [fieldIndex]: {
        ...prev[fieldIndex],
        input: e.target.value,
      },
    }));
  };

  const handleOutputAreaChange = (
    fieldIndex: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTestCases((prev) => ({
      ...prev,
      [fieldIndex]: {
        ...prev[fieldIndex],
        output: e.target.value,
      },
    }));
  };

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <div className="flex justify-center mb-8 align-center">
          <div
            className="px-4 py-2 mr-16 border-2 rounded-md"
            style={{
              borderColor: stepperActive === 1 ? "white" : "grey",
              color: stepperActive === 1 ? "white" : "grey",
            }}
          >
            Question
          </div>
          <div
            className="px-4 py-2 mr-16 border-2 rounded-md"
            style={{
              borderColor: stepperActive === 2 ? "white" : "grey",
              color: stepperActive === 2 ? "white" : "grey",
            }}
          >
            Solution
          </div>
          <div
            className="px-4 py-2 mr-16 border-2 rounded-md"
            style={{
              borderColor: stepperActive === 3 ? "white" : "grey",
              color: stepperActive === 3 ? "white" : "grey",
            }}
          >
            Test Cases
          </div>
        </div>
        {stepperActive === 1 && (
          <>
            <div className="grid grid-cols-2">
              <div className="mb-8 mr-16">
                <p
                  className="mb-2 text-lg font-bold text-white"
                  style={{ color: "#9FAEC8" }}
                >
                  Track <span style={{ color: "red" }}>*</span>
                </p>
                <Select
                  className="text-black"
                  defaultValue={categoryOptions[0]}
                  onChange={setTrack as never}
                  options={categoryOptions}
                  placeholder="Select Track"
                />
              </div>
              <div className="mb-8 mr-16">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-8 mr-16">
                <p
                  className="mb-2 text-lg font-bold text-white"
                  style={{ color: "#9FAEC8" }}
                >
                  Category <span style={{ color: "red" }}>*</span>
                </p>
                <Select
                  className="text-black"
                  defaultValue={categories}
                  onChange={setCategories as never}
                  options={categoryOptions}
                  placeholder="Select Category"
                  isMulti
                  isSearchable
                />
              </div>
              <div className="mb-8 mr-16">
                <p
                  className="mb-2 text-lg font-bold text-white"
                  style={{ color: "#9FAEC8" }}
                >
                  Difficulty level <span style={{ color: "red" }}>*</span>
                </p>
                <Select
                  className="text-black"
                  defaultValue={difficulty}
                  onChange={setDifficulty as never}
                  options={difficultyOptions}
                  placeholder="Select Difficulty"
                />
              </div>
              <div />
            </div>
            <p
              className="mb-2 text-lg font-bold text-white"
              style={{ color: "#9FAEC8" }}
            >
              Problem Description <span style={{ color: "red" }}>*</span>
            </p>
            <MDEditor
              className="mb-8"
              height={500}
              value={description}
              onChange={setDescription as never}
            />
          </>
        )}

        {stepperActive === 2 && (
          <>
            <p className="mb-8 " style={{ color: "#9FAEC8" }}>
              Do you have any workable ideas or code you want to share? Write
              your pseudocode here
            </p>
            <p className="mb-2 text-lg font-bold" style={{ color: "#9FAEC8" }}>
              Solutions
            </p>

            <MDEditor
              className="mb-8"
              height={500}
              value={solutions}
              onChange={setSolutions as never}
            />
          </>
        )}

        {stepperActive === 3 && (
          <>
            <p
              className="mb-2 text-lg font-bold text-white"
              style={{ color: "#9FAEC8" }}
            >
              Test Cases <span style={{ color: "red" }}>*</span>
            </p>
            <div className="grid grid-cols-2 gap-8">
              {Object.keys(testCases).map((testNumber, fieldIndex) => (
                <>
                  <textarea
                    rows={3}
                    className="block w-full p-2 mt-1 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={testCases[testNumber].input}
                    onChange={(e) => handleInputAreaChange(fieldIndex, e)}
                  ></textarea>
                  <textarea
                    rows={3}
                    className="block w-full p-2 mt-1 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={testCases[testNumber].output}
                    onChange={(e) => handleOutputAreaChange(fieldIndex, e)}
                  ></textarea>
                </>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-12">
              <button
                type="button"
                className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                onClick={addTestCase}
              >
                Add test case
              </button>
              <button
                type="button"
                className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                onClick={removeTestCase}
              >
                Remove test case
              </button>
            </div>
          </>
        )}

        <div className="flex justify-center mt-12 gap-12">
          {stepperActive > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Back Step
            </button>
          )}
          {stepperActive < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next Step
            </button>
          )}
          {stepperActive === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};
