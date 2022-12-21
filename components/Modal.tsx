import React, { useState } from 'react';

interface IProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
  withFooter?: boolean;
  width?: number | string;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({
  open,
  setOpen,
  withFooter,
  onConfirm,
  width,
  children
}) => {
  return (
    <>
      {open ? (
        <>
          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
            style={{ backgroundColor: '#00000059' }}
            onClick={(e) => {
              setOpen && setOpen(false);
            }}
          >
            <div
              className={`relative w-${width || 'auto'} my-6 mx-auto`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="bg-transparent border-0 text-black absolute top-5 right-6 z-40 "
                  onClick={() => setOpen(false)}
                >
                  &#x2715;
                </button>
                <div className="relative p-6 flex-auto mt-6 ">{children}</div>
                {withFooter && (
                  <div className="flex items-center justify-end p-5 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-green-500 active:bg-green-700 uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => onConfirm()}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
