import React, { useState } from 'react';
import Modal from './Modal';

interface IProps {}

const BoothCard: React.FC<IProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        id="app"
        className="bg-white shadow-md flex card text-grey-darkest rounded-l overflow-hidden"
      >
        <img
          className="w-1/2 h-full rounded-l-sm"
          src="https://bit.ly/2EApSiC"
          alt="Room Image"
        />
        <div className="w-full flex flex-col">
          <div className="p-3 pb-0 flex-1">
            <h3 className="mb-1 text-grey-darkest">Booth 1</h3>
            <div className="text-xs flex items-center mb-4">
              We offer .......
            </div>
          </div>
          <div
            className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Contact Now
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal open={open} setOpen={setOpen} withFooter width={'1/2'}>
        <div>
          <div className="flex flex-col mt-2">
            <label className="font-semibold text-gray-700">*Message:</label>
            <textarea
              className="border rounded outline-none p-1 bg-gray-100 focus:bg-indigo-100"
              rows={4}
              v-model="message"
            ></textarea>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BoothCard;
