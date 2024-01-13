import Image from "next/image";
import React from "react";

type Props = {
  type: string;
  value?: string;
  onChangeHandler: (value: string) => void;
  iconAlt: string;
  iconSrc: string;
  className?: string;
  onBlurHandler?: () => void;
  placeholder?: string;
};

const InputContainer = ({
  type,
  value,
  onChangeHandler,
  placeholder,
  iconAlt,
  iconSrc,
  onBlurHandler,
  className,
}: Props) => {
  return (
    <div className="auth__input-container w-full">
      <Image width={25} height={25} src={iconSrc} alt={iconAlt} />
      <input
        type={type}
        value={value}
        className={`auth__input ${className}`}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default InputContainer;
