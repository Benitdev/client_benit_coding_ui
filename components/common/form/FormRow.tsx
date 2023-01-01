const FormRow = ({ children, className = '' }: any) => {
  return (
    <div className={`grid grid-cols-2 gap-10 ${className}`}>{children}</div>
  );
};

export default FormRow;
