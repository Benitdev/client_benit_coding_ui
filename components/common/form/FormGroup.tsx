const FormGroup = ({ children, className = '' }: any) => {
  return (
    <div
      className={`mb-10 flex flex-1 flex-col items-start gap-y-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormGroup;
