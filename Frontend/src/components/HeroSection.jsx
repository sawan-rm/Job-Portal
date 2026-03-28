import React from "react";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium">
          No. 1 Job Hunt Platform
        </span>

        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#ed8033]">Dream Jobs</span>
        </h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
          officia! Illo libero iste expedita repudiandae.
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full"
          />

          <button className="rounded-r-full bg-[#ed8033] hover:bg-[#d96f24] p-2">
            <Search className="h-5 w-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
