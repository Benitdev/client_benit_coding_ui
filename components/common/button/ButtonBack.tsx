import Link from 'next/link';

const ButtonBack = ({ href = '/' }) => {
  return (
    <Link href={href} className="flex items-center gap-x-2 text-slate-400">
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
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      <span>Back</span>
    </Link>
  );
};
export default ButtonBack;
