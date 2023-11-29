import { ButtonGroup } from "@material-tailwind/react";
import React from "react";

function SearchBar() {
  return (
    <>
      <div className="relative h-32 rounded-[2.2rem] overflow-hidden">
        <div className="h-full w-full bg-black absolute opacity-60 z-10"></div>

        <div className="h-[50%] flex justify-start gap-4 ml-16 relative z-20">
          <h3 className="text-xl mt-3 text-white font-bold">RENT</h3>
          <h3 className="text-xl mt-3 text-white font-bold">P/G</h3>
        </div>

        <div className="h-[58%] bg-white rounded-full relative z-20"></div>
      </div>
    </>
  );
}

export default SearchBar;
