import Link from 'next/link';

const ButtonAddNew = ({ handleOnClick }: any) => {
  return (
    <button
      className="fixed bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary p-1 text-white shadow-xl"
      onClick={handleOnClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
};

export default ButtonAddNew;
