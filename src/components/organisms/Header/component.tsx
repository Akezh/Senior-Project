import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { toast } from "react-toastify";

import { useRoleProvider } from "../../../../providers";
import { useAccountProfile } from "../../../hooks";

const MENU = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create track",
    path: "/course/create",
  },
  {
    name: "Create problem",
    path: "/problem/create",
  },
];

export const Header: FC = () => {
  // const { isLoggedIn, fullname, removeLoggedProfile } = useAccountProfile();
  const role = useRoleProvider();
  const router = useRouter();

  const onSignOutClick = () => {
    // removeLoggedProfile();
    role.logout();
    toast.info("You have been signed out.");
    // setTimeout(() => {
    //   router.push("/auth?login=true");
    // }, 2000);
  };

  return (
    <header>
      <nav className="px-4 bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Company Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CodePower
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {!role.state.logged ? (
              <>
                <Link
                  href="/auth?login=true"
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-800 rounded-lg dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth"
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-800 rounded-lg dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Hi {role.state.user.fullname}!
                <button
                  onClick={onSignOutClick}
                  type="button"
                  className="inline-flex items-center p-2 ml-5 text-red-500 rounded-lg text-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-red-400 dark:hover:bg-gray-700 dark:focus:ring-red-600"
                >
                  Sign Out
                </button>
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {role.state.role === "TEACHER" && (
            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {MENU.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className={clsx(
                        "block py-2 pl-3 pr-4 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0",
                        router.pathname === item.path
                          ? "text-white"
                          : "text-gray-500"
                      )}
                      aria-current="page"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
