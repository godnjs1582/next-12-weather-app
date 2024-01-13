import Image from "next/image";
import React from "react";
import weatherIcon from "@/public/weather-icon.png";

const WelcomeContent = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Image className="app-logo" src={weatherIcon} alt="weather-icon" />
    </div>
  );
};

export default WelcomeContent;
