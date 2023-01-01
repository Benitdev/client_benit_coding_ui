const Label = ({ children, className = '' }: any) => {
  return (
    <label
      className={`inline-block cursor-pointer text-base font-semibold ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
