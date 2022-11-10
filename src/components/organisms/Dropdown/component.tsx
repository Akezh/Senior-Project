import clsx from "clsx";
import React, { useRef, useState } from "react";

import { useOnClickOutside } from "../../../hooks";

type Option = {
  name: string;
  callback: (e: React.MouseEvent) => void;
};

type Props = {
  className?: string;
  left?: string;
  right?: string;
  options?: Option[];
  top?: boolean;
};

export const Dropdown = ({ className, left, right, options, top }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = useState(false);

  useOnClickOutside(buttonRef, () => setFocused(false));

  return (
    <div
      className={clsx("relative inline-block text-left dropdown", className)}
    >
      <span className="rounded-md shadow-sm">
        <button
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white border border-gray-300 leading-5 transition duration-150 ease-in-out rounded-md focus:outline-none focus:shadow-outline-blue active:text-opacity-80"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-menu-items-117"
          onClick={() => {
            setFocused((f) => !f);
          }}
          ref={buttonRef}
        >
          {left && <span>{left}</span>}
          <div className="flex">
            {right && <p>{right}</p>}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </span>
      <div
        className={clsx(
          "dropdown-menu transition-all duration-300 transform origin-top-right",
          !focused && "invisible opacity-0 -translate-y-2 scale-95",
          focused && "opacity-100 translate-y-0 scale-100 visible"
        )}
      >
        <div
          className={clsx(
            "absolute right-0 w-full mt-2 bg-white border border-gray-200 shadow-lg outline-none origin-top-right divide-y divide-gray-100 rounded-md max-h-40 overflow-scroll",
            top && "bottom-11"
          )}
          aria-labelledby="headlessui-menu-button-1"
          id="headlessui-menu-items-117"
          role="menu"
        >
          {options?.map((option, i) => (
            <div className="py-1" key={i}>
              <button
                className="flex justify-between w-full px-4 py-1 text-sm text-left text-gray-700 leading-5"
                role="menuitem"
                onClick={(e: React.MouseEvent) => {
                  option.callback?.(e);
                  setFocused(false);
                }}
              >
                {option.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
