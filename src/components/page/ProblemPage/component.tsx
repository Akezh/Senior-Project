import Editor from "@monaco-editor/react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import { axiosApi } from "../../../../core/config";
import { useRoleProvider } from "../../../../providers";
import { config, examples, langConfig } from "../../../config";
import { useInterval } from "../../../hooks";
import { Modal } from "../../organisms";
import { PageTemplate } from "../../templates";

const TABS = ["Statement", "Submissions", "Solution"];

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

export const MySumbmissions: FC<any> = ({
  submissions,
  setCodeValue,
  setModalContent,
}) => {
  if (submissions.length === 0) {
    return (
      <p className="text-gray-300">You did not make any submissions yet.</p>
    );
  }

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
      <tbody className="text-gray-300">
        {submissions.map((submission: any, i: number) => (
          <tr key={i}>
            <td className="px-4 py-3">
              {`${new Date(submission.date).toDateString()}, ${new Date(
                submission.date
              ).toLocaleTimeString()}`}
            </td>
            <td className="px-4 py-3">{submission.language}</td>
            <td className="px-4 py-3">
              <button
                className="underline"
                onClick={() => {
                  setCodeValue(submission.code);
                }}
              >
                Use
              </button>
            </td>
            <td className="px-4 py-3">
              <button
                className={clsx(
                  submission.verdict === "testing"
                    ? "cursor-default"
                    : "underline"
                )}
                onClick={() => {
                  if (submission.verdict !== "testing") {
                    setModalContent(submission.verdictMessage);
                  }
                }}
              >
                {submission.verdict.charAt(0).toUpperCase() +
                  submission.verdict.slice(1)}
              </button>
            </td>
          </tr>
        ))}
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
  const [submissions, setSubmissions] = useState([]);
  const role = useRoleProvider();
  const [problemDetails, setProblemDetails] = useState<any>(null);
  const editorRef = useRef(null);
  const [modalContent, setModalContent] = useState<string>("");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      const { data } = await axiosApi.get(`/problem/${router.query.id}`);
      console.log(router.query.id);
      setProblemDetails(data);
      console.log(data);
    };

    if (router.query.id) fetchProblemDetails();
  }, [router]);

  const submitSubmission = async () => {
    await axiosApi.post(
      `/submission`,
      {
        problemId: router.query.id,
        language: language.value,
        code: (editorRef.current as any).getValue(),
      },
      { headers: { Authorization: `Bearer ${role.state.token}` } }
    );
    toast.success("Submitted solution. Await for verdict.");
    setActiveTab(1);
  };

  const fetchSubmissions = async () => {
    if (role.state.logged && router.query.id) {
      const { data } = await axiosApi.get(
        `/submission/problem/${router.query.id}`,
        {
          headers: { Authorization: `Bearer ${role.state.token}` },
        }
      );
      setSubmissions(
        data.sort((x: any, y: any) =>
          new Date(x.date) > new Date(y.date) ? -1 : 1
        )
      );
    }
  };

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const setCodeValue = (value: string) => {
    (editorRef.current as any).setValue(value);
  };

  useInterval(fetchSubmissions, 1000);

  return (
    <PageTemplate offDefaultStyles>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
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
                <h3 className="my-6 text-2xl font-bold">
                  {problemDetails?.title}
                </h3>
                <MarkdownPreview
                  className="mt-4"
                  source={problemDetails?.statement}
                  warpperElement={{ "data-color-mode": "dark" }}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="my-6 text-2xl font-bold">My submissions</h3>
                {role.state.logged ? (
                  <MySumbmissions
                    submissions={submissions}
                    setCodeValue={setCodeValue}
                    setModalContent={setModalContent}
                  />
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
                <MarkdownPreview
                  className="mt-4"
                  source={problemDetails?.solution}
                  warpperElement={{ "data-color-mode": "dark" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Select
            className="w-32 my-4 text-black"
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
              onMount={handleEditorDidMount}
            />
          </div>
          <div className="flex">
            <button className="hidden px-4 py-2 mt-4 mr-4 text-sm font-medium tracking-wider text-center bg-gray-700 sm:px-6 sm:w-auto sm:justify-start title-font bg-opacity-10 rounded-md">
              Run code
            </button>
            <button
              className="px-4 py-2 mt-4 text-sm font-medium tracking-wider text-center bg-gray-700 sm:px-6 sm:w-auto sm:justify-start title-font text-green-550 bg-opacity-10 rounded-md hover:opacity-80 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={submitSubmission}
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
