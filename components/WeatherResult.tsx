import { WeatherData } from "@/models/customTypes";
import React from "react";
import weatherImage from "@/public/weather.svg";
import Image from "next/image";

type WeatherProps = {
  weatherData: WeatherData;
};

const WeatherResult = ({ weatherData }: WeatherProps) => {
  const city = weatherData.name;
  const temp = weatherData.main.temp.toFixed();
  const country = weatherData.sys.country;
  const imgSrc = weatherData.weather[0].icon || weatherImage;

  const customLoader = ({ src }: { src: string }) => {
    return `http://openweathermap.org/img/wn/${src}@2x.png`;
  };

  return (
    <div className="mt-4 space-y-1">
      <h2 className="text-2xl font-semibold text-primary">{`${city} ${country}`}</h2>
      <Image
        src={imgSrc}
        loader={customLoader}
        alt="weather-image"
        className="mx-auto"
        width={150}
        height={150}
      />
      <p className="weather__temp">{temp}°</p>
      <p>{weatherData.weather[0].main}</p>
    </div>
  );
};

export default WeatherResult;
