import React from 'react';

const ModalClose = ({ onClick = () => {} }) => {
  return (
    <div className="sticky top-0 z-10">
      <div
        aria-label="modal-close"
        className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-900"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default ModalClose;
