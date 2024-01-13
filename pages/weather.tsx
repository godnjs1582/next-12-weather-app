import { TopologyDescription } from "mongodb";
import { GetServerSideProps } from "next";
import { SignOutResponse, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchData, API_KEY, BASE_URL } from "@/lib/weather-services";
import { WeatherData } from "@/models/customTypes";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading/Loading";
import WeatherResult from "@/components/WeatherResult";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [city, setCity] = useState("Seoul");
  const [isTempLow, setIsTempLow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getWeatherData = async () => {
      if (city.trim().length > 0) {
        setIsLoading(true);
        try {
          const weather: WeatherData = await fetchData(
            `${BASE_URL}weather?q=${city}&limit=6&appid=${API_KEY}&units=metric`
          );
          setCurrentWeather(weather);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getWeatherData();
  }, [city]);

  useEffect(() => {
    if (currentWeather) {
      const temp = +currentWeather?.main.temp.toFixed();
      setIsTempLow(temp < 3);
    }
  }, [currentWeather]);

  const logoutHandler = () => {
    const data = signOut({ redirect: false, callbackUrl: "/" });
    data.then((res: SignOutResponse) => {
      router.push(res.url);
    });
  };

  const cardBg = isTempLow ? "bg-tempLow" : "bg-tempHigh";

  let weatherResultContent = <Loading />;
  if (!isLoading && !currentWeather) {
    weatherResultContent = <p className="py-5">Nothing Found!</p>;
  }

  if (!isLoading && currentWeather) {
    weatherResultContent = <WeatherResult weatherData={currentWeather} />;
  }
  return (
    <Layout
      className={`w-3/4 ${cardBg} bg-cover bg-card bg-blend-overlay lg:w-1/4`}
    >
      <div className="weather">
        <SearchBar onCityChange={setCity} />
        {weatherResultContent}
        <button
          className="btn btn__secondary"
          onClick={logoutHandler}
          type="button"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Weather;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
