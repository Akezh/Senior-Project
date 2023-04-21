import clsx from "clsx";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const Modal: React.FC<any> = ({ setModalContent, modalContent }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-screen bg-gray-200 modal-body absolute text-black",
        modalContent && "modal-active"
      )}
      style={{ zIndex: 1000 }}
    >
      <div
        className={clsx(
          "fixed top-0 left-0 flex items-center justify-center w-full h-full modal",
          !modalContent && "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
          onClick={() => setModalContent("")}
        ></div>

        <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-lg">
          <div className="px-6 py-4 text-left modal-content">
            <div className="flex items-center justify-between pb-3">
              <p className="text-2xl font-bold">Submission summary</p>
            </div>
            <p>{modalContent}</p>

            {/* <div className="flex justify-end pt-2">
              <button
                disabled={otp.length === 0}
                className="px-3 py-2 text-white bg-green-500 rounded-lg modal-close hover:opacity-90 transition-opacity disabled:opacity-40"
                onClick={handleSubmitOtp}
              >
                Завершить
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
