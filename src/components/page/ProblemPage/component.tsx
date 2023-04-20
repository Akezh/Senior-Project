import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Select from "react-select";
import rehypeRaw from "rehype-raw";

import { config, examples, langConfig } from "../../../config";
import { PageTemplate } from "../../templates";
import { PROBLEM_EDITORIAL, PROBLEM_STATEMENT } from "./mock";

const TABS = ["Statement", "Submissions", "Solution"];

export const ProblemPage = () => {
  const [language, setLanguage] = useState({
    value: langConfig[0].value,
    label: langConfig[0].label,
  });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageTemplate offDefaultStyles>
      <div className="flex">
        <div
          className="flex-1 overflow-y-scroll"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <div className="px-5 mx-auto mt-3 text-white">
            <div className="flex">
              {TABS.map((tab, i) => (
                <button
                  className={clsx(
                    "inline-flex items-center justify-center flex-1 py-3 font-medium leading-none tracking-wider text-center border-b-2 border-gray-200 sm:px-6 title-font transition-all",
                    activeTab === i &&
                      "bg-gray-100 border-b-2 rounded-sm sm:px-6 title-font border-green-550 text-green-550 bg-opacity-10"
                  )}
                  onClick={() => setActiveTab(i)}
                  key={i}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="pb-10 text-white px-7">
            {activeTab === 0 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">Two sum</h3>
                <ReactMarkdown
                  className="mt-4 text-base"
                  rehypePlugins={[rehypeRaw]}
                >
                  {PROBLEM_STATEMENT}
                </ReactMarkdown>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">My submissions</h3>
                <p>You did not make any submissions yet.</p>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">Solution</h3>
                <ReactMarkdown
                  className="mt-4 text-base"
                  rehypePlugins={[rehypeRaw]}
                >
                  {PROBLEM_EDITORIAL}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Select
            className="w-24 my-4 text-black"
            defaultValue={language}
            onChange={setLanguage as never}
            options={langConfig}
            placeholder="Select Difficulty"
          />
          <div style={{ height: "calc(100vh - 200px)" }}>
            <Editor
              className="w-full"
              theme="vs-dark"
              height="100%"
              defaultLanguage={config.defaultLanguage}
              defaultValue={examples[language?.value as string]}
              path={language?.value || config.defaultLanguage}
              language={language?.value || config.defaultLanguage}
            />
          </div>
          <div className="flex">
            <button className="hidden px-4 py-2 mt-4 mr-4 text-sm font-medium tracking-wider text-center bg-gray-100 sm:px-6 sm:w-auto sm:justify-start title-font bg-opacity-10 rounded-md">
              Run code
            </button>
            <button className="px-4 py-2 mt-4 text-sm font-medium tracking-wider text-center bg-gray-100 sm:px-6 sm:w-auto sm:justify-start title-font text-green-550 bg-opacity-10 rounded-md hover:opacity-80 transition-opacity">
              Submit
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};
