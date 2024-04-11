"use client";

import React, { FC } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
       py-3 inline-flex items-center justify-center rounded bg-primary text-secondary font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity duration-150
      `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full"
      )}
    >
      {disabled ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
