import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  className = '',
  type = 'button',
  ...props
}: any) => {
  const { isLoading, ...rest } = props;
  const child = isLoading ? (
    <div className="border-white-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
  ) : (
    children
  );
  return (
    <button
      type={type}
      className={`bg-third inline-flex h-[55px] items-center justify-center rounded-lg px-8 py-4 font-sans font-semibold tracking-wide text-white disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {child}
    </button>
  );
};

export default Button;
