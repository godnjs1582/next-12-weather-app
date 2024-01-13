import { API_KEY, GEO_API_URL, fetchData } from "@/lib/weather-services";
import { Cities, LoadedCities } from "@/models/customTypes";
import React, { useEffect, useState } from "react";
import InputContainer from "./InputContainer";
import SearchIcon from "@/public/search_magnifier_mobile ui_zoom_icon.svg";
import LoadingSpinner from "./Loading/LoadingSpinner";
import SearchSuggestions from "./SearchSuggestions";
type Props = {
  onCityChange: (city: string) => void;
};
const SearchBar = ({ onCityChange }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<LoadedCities[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCitySuggestions = async () => {
      if (searchValue.length > 2) {
        setIsLoading(true);
        try {
          const cities: Cities[] = await fetchData(
            `${GEO_API_URL}q=${searchValue}&limit=6&appid=${API_KEY}`
          );

          const loadedCities = cities.map((city) => {
            return {
              country: `${city.country}`,
              name: `${city.name}`,
            };
          });

          setCitySuggestions([...loadedCities]);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }
    };
    getCitySuggestions();
  }, [searchValue]);

  const handleSuggestionOnClick = (value: string) => {
    setCitySuggestions([]);
    setSearchValue("");
    onCityChange(value);
    
  };

  return (
    <div className="w-full">
      <div className="glex gap-1">
        <InputContainer
          iconAlt="search-icon"
          iconSrc={SearchIcon}
          value={searchValue}
          onChangeHandler={setSearchValue}
          onBlurHandler={() => {
            setTimeout(() => {
              setCitySuggestions([]);
            }, 200);
          }}
          className="capitalize"
          type="text"
          placeholder="도시 이름을 "
        />
        {isLoading && <LoadingSpinner />}
      </div>
      {citySuggestions.length > 0 && (
        <SearchSuggestions
          onCityClickHandler={handleSuggestionOnClick}
          cityOptions={citySuggestions}
        />
      )}
    </div>
  );
};

export default SearchBar;
