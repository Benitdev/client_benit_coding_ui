import clsx from 'clsx';
import React from 'react';

const colors = ['#ffa400', '#fc6c8f', '#6a5af9', '#d66efd'];
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
const Avatar = ({ className = '', username = '' }) => {
  const newName = username?.split('')[0] || 'B';
  const color = getRandomColor();
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full border-slate-500 font-bold uppercase',
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    >
      {newName}
    </div>
  );
};

export default Avatar;
