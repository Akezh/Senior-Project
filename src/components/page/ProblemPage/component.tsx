import Editor from "@monaco-editor/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";

import { axiosApi } from "../../../../core/config";
import { useRoleProvider } from "../../../../providers";
import { config, examples, langConfig } from "../../../config";
import { PageTemplate } from "../../templates";
import { PROBLEM_EDITORIAL, PROBLEM_STATEMENT } from "./mock";

const TABS = ["Statement", "Submissions", "Solution"];

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

export const MySumbmissions = () => {
  return (
    <table className="w-full text-left whitespace-no-wrap table-auto submissions">
      <thead>
        <tr>
          <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 rounded-tl rounded-bl title-font">
            Date
          </th>
          <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 title-font">
            Language
          </th>
          <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 title-font">
            Code
          </th>
          <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 title-font">
            Verdict
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-3">Start</td>
          <td className="px-4 py-3">5 Mb/s</td>
          <td className="px-4 py-3">15 GB</td>
          <td className="px-4 py-3 text-lg">Free</td>
        </tr>
        <tr>
          <td className="px-4 py-3 border-t border-gray-600">Pro</td>
          <td className="px-4 py-3 border-t border-gray-600">25 Mb/s</td>
          <td className="px-4 py-3 border-t border-gray-600">25 GB</td>
          <td className="px-4 py-3 text-lg border-t border-gray-600">$24</td>
        </tr>
      </tbody>
    </table>
  );
};

export const ProblemPage = () => {
  const router = useRouter();
  const [language, setLanguage] = useState({
    value: langConfig[0].value,
    label: langConfig[0].label,
  });
  const [activeTab, setActiveTab] = useState(0);
  const role = useRoleProvider();
  const [problemDetails, setProblemDetails] = useState<any>(null);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      const { data } = await axiosApi.get(`/problem/${router.query.id}`);
      setProblemDetails(data);
      console.log(data);
    };

    if (router.query.id) fetchProblemDetails();
  }, [router]);

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
                      "bg-gray-700 border-b-2 rounded-sm sm:px-6 title-font border-green-550 text-green-550 bg-opacity-10"
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
                <MarkdownPreview className="mt-4" source={PROBLEM_STATEMENT} />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">My submissions</h3>
                {role.state.logged ? (
                  <MySumbmissions />
                ) : (
                  <p className="text-gray-300">
                    Please login to view your submissions for this problem.
                  </p>
                )}
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">Solution</h3>
                <MarkdownPreview className="mt-4" source={PROBLEM_EDITORIAL} />
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
            <button className="hidden px-4 py-2 mt-4 mr-4 text-sm font-medium tracking-wider text-center bg-gray-700 sm:px-6 sm:w-auto sm:justify-start title-font bg-opacity-10 rounded-md">
              Run code
            </button>
            <button
              className="px-4 py-2 mt-4 text-sm font-medium tracking-wider text-center bg-gray-700 sm:px-6 sm:w-auto sm:justify-start title-font text-green-550 bg-opacity-10 rounded-md hover:opacity-80 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!role.state.logged}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};
