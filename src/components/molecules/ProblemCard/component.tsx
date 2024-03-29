import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { TiTick } from "react-icons/ti";

import { Props } from "./props";

export const ProblemCard: FC<Props> = ({ title, subtitle, link, solved }) => {
  return (
    <div
      className="flex justify-between p-8 align-center"
      style={{ background: "#0A121D" }}
    >
      <div>
        <div className="flex items-center">
          <p
            className={clsx(
              "text-2xl font-bold",
              solved ? "text-green-500" : "text-white"
            )}
          >
            {title}
          </p>
          {solved && <TiTick className="text-2xl text-green-500" />}
        </div>
        <p
          className="mt-2 text-sm font-bold text-white"
          style={{ color: "#909FB8" }}
        >
          {subtitle}
        </p>
      </div>
      <Link
        href={link}
        className="relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg p-0.5 group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        style={{ backgroundColor: "#9FEE3D", height: 48 }}
      >
        <span className="relative px-5 bg-white py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Solve Challenge
        </span>
      </Link>
    </div>
  );
};
