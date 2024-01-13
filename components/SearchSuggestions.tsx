import { LoadedCities } from "@/models/customTypes";
import React from "react";

type Props = {
  cityOptions: LoadedCities[];
  onCityClickHandler: (value: string) => void;
};

const SearchSuggestions = ({ cityOptions, onCityClickHandler }: Props) => {
  return (
    <div
      className={`px-2 py2 absolute w-full text-slate-300 bg-[#2e2968] shadow-md min-h-fit`}
    >
      <ul>
        {cityOptions.map((cityOption) => (
          <li
            className="p-1 cursor-pointer transition-all duration-300 hover:text-[#56aad8]"
            onClick={() =>
              onCityClickHandler(`${cityOption.name}, ${cityOption.country}`)
            }
            key={cityOption.name}
          >
            {`${cityOption.name},${cityOption.country}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
