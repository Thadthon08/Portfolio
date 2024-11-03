import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative 
        rounded-lg 
        border 
        border-yellow-500/20 
        bg-slate-900/20 
        backdrop-blur-lg
        transition-all
        duration-500
        hover:border-yellow-400/40
        before:absolute
        before:-inset-[1px]
        before:rounded-lg
        before:transition-all
        before:duration-500
        hover:before:shadow-[0_0_30px_2px_rgba(250,204,21,0.15)]
        before:-z-10
        after:absolute
        after:-z-20
        after:-inset-[2px]
        after:rounded-lg
        after:opacity-0
        after:transition-all
        after:duration-500
        hover:after:opacity-100
        after:blur-md
        after:bg-gradient-to-r
        after:from-yellow-500/0
        after:via-yellow-500/10
        after:to-yellow-500/0
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
