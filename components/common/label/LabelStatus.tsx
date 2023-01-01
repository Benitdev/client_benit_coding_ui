const LabelStatus = ({
  children,
  className = 'bg-green-500',
  ...rest
}: any) => {
  return (
    <span
      className={`inline-block cursor-pointer rounded-full px-4 py-2 text-white ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
