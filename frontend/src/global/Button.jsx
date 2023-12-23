import React from 'react';

const Button = (props) => {
  // Construct the dynamic class using template literals
  const dynamicClass = `text-center text-[#fff] font-poppins font-700 bg-[#338573] ${props.border}  w-[7.6875rem] h-[2.875rem]`;

  return (
    <button onClick = {props.onClick} className={dynamicClass} disabled = {props.disabled}> <span className="flex justify-center gap-1 items-center text-[0.9rem]"><span>{props.msg}</span> {props.icon && <props.icon size={20} />}</span></button>
  );
};

export default Button;
