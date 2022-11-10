import Editor from "@monaco-editor/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { config, examples } from "../../../config";
import { Dropdown } from "../../organisms";
import { PageTemplate } from "../../templates";
import { PROBLEM_STATEMENT } from "./mock";

export const ProblemPage = () => {
  const [chosenLanguage, setChosenLanguage] = useState(config.defaultLanguage);
  const language = config.supportedLanguages.find(
    ({ name }) => name === chosenLanguage
  );

  return (
    <PageTemplate offDefaultStyles>
      <div className="flex">
        <div className="flex-1 overflow-y-scroll">
          <div className="px-5 mx-auto mt-3 text-white">
            <div className="flex">
              <a className="inline-flex items-center justify-center flex-1 py-3 font-medium leading-none tracking-wider text-center bg-gray-100 border-b-2 rounded-sm sm:px-6 title-font border-green-550 text-green-550 bg-opacity-10">
                Statement
              </a>
              <a className="inline-flex items-center justify-center flex-1 py-3 font-medium leading-none tracking-wider text-center border-b-2 border-gray-200 sm:px-6 title-font">
                Submissions
              </a>
              <a className="inline-flex items-center justify-center flex-1 py-3 font-medium leading-none tracking-wider text-center border-b-2 border-gray-200 sm:px-6 title-font">
                Solution
              </a>
            </div>
          </div>
          <div className="pb-10 text-white px-7">
            <h3 className="my-6 text-2xl font-bold">Two sum</h3>
            <ReactMarkdown
              className="mt-4 text-base"
              rehypePlugins={[rehypeRaw]}
            >
              {PROBLEM_STATEMENT}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex-1">
          <Dropdown
            left={language?.text}
            className="z-20 w-32 my-4"
            options={config.supportedLanguages.map((language) => ({
              name: language.text,
              callback: () => setChosenLanguage(language.name),
            }))}
          />
          <div style={{ height: "calc(100vh - 200px)" }}>
            <Editor
              className="w-full"
              theme="vs-dark"
              height="100%"
              defaultLanguage={config.defaultLanguage}
              defaultValue={examples[language?.name as string]}
              path={language?.name || config.defaultLanguage}
              language={language?.name || config.defaultLanguage}
            />
          </div>
          <div className="flex">
            <button className="px-4 py-2 mt-4 mr-4 text-sm font-medium tracking-wider text-center bg-gray-100 sm:px-6 sm:w-auto sm:justify-start title-font bg-opacity-10 rounded-md">
              Run code
            </button>
            <button className="px-4 py-2 mt-4 text-sm font-medium tracking-wider text-center bg-gray-100 sm:px-6 sm:w-auto sm:justify-start title-font text-green-550 bg-opacity-10 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};
