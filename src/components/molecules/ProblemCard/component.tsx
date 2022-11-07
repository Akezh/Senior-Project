import { FC } from "react";

import { Props } from "./props";

export const ProblemCard: FC<Props> = ({ title, subtitle }) => {
  return (
    <div
      className="flex justify-between p-8 align-center"
      style={{ background: "#0A121D" }}
    >
      <div>
        <p className="text-2xl font-bold text-white">{title}</p>
        <p
          className="mt-2 text-sm font-bold text-white"
          style={{ color: "#909FB8" }}
        >
          {subtitle}
        </p>
      </div>
      <button
        className="px-8 py-2 my-auto text-lg text-black border-0 focus:outline-none"
        style={{ backgroundColor: "#9FEE3D", height: 48 }}
      >
        Solve Challenge
      </button>
    </div>
  );
};
