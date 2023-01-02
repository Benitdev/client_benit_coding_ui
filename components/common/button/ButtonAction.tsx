import React from 'react';

const ButtonAction = (props: any) => {
  const { onClick = () => null, className = '', children } = props;
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 text-slate-600  ${className}`}
      onClick={onClick}
    >
      <span className="pointer-events-none">{children}</span>
    </button>
  );
};

export default ButtonAction;
