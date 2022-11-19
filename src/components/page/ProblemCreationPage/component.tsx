import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import { useState } from "react";

import { PageTemplate } from "../../templates";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export const ProblemCreationPage = () => {
  const [value, setValue] = useState("");

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <p className="mb-4 text-2xl font-bold text-white">
          Contribute a problem
        </p>
        <p className="mb-4 text-lg text-white" style={{ color: "#9FAEC8" }}>
          Problem Description
        </p>
        <MDEditor
          className="mb-8"
          height={400}
          value={value}
          onChange={setValue as never}
        />

        <div className="flex justify-center mt-12">
          <button
            type="button"
            className="px-5 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Next Step
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};
