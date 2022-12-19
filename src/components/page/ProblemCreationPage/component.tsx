import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import { useState } from "react";
import Select from "react-select";

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

  const handleNext = () => setStepperActive((step) => step + 1);
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
              <div>
                <div className="mb-8">
                  <p
                    className="mb-2 text-lg font-bold text-white"
                    style={{ color: "#9FAEC8" }}
                  >
                    Title
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
                <div className="mb-8">
                  <p
                    className="mb-2 text-lg font-bold text-white"
                    style={{ color: "#9FAEC8" }}
                  >
                    Category
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
                <div className="mb-8">
                  <p
                    className="mb-2 text-lg font-bold text-white"
                    style={{ color: "#9FAEC8" }}
                  >
                    Difficulty level
                  </p>
                  <Select
                    className="text-black"
                    defaultValue={difficulty}
                    onChange={setDifficulty as never}
                    options={difficultyOptions}
                    placeholder="Select Difficulty"
                  />
                </div>
              </div>
              <div />
            </div>
            <p
              className="mb-2 text-lg font-bold text-white"
              style={{ color: "#9FAEC8" }}
            >
              Problem Description
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
              Test Cases
            </p>
            <div className="grid grid-cols-2 gap-8">
              {Object.keys(testCases).map((testNumber) => (
                <>
                  <textarea
                    rows={3}
                    className="block w-full p-2 mt-1 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={testCases[testNumber].input}
                  ></textarea>
                  <textarea
                    rows={3}
                    className="block w-full p-2 mt-1 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={testCases[testNumber].output}
                  ></textarea>
                </>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                onClick={addTestCase}
              >
                Add Test Case
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
        </div>
      </div>
    </PageTemplate>
  );
};
