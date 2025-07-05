import { Autocomplete } from "@react-google-maps/api";
import React, { RefObject } from "react";

interface LocationInputProps {
  placeholder: string;
  inputRef: RefObject<HTMLInputElement>;
}

export default function LocationInput({ placeholder, inputRef }: LocationInputProps) {
  return (
    <div className="flex-grow">
      <Autocomplete>
        <input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          className="px-2 py-1 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </Autocomplete>
    </div>
  );
}
