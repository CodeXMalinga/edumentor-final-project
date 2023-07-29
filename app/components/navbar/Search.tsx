"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const subject = params?.get("subject");

  const subjectLabel = useMemo(() => {
    if (subject) {
      return `${subject}`;
    }

    return "Click here to search any subject";
  }, [subject]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{subjectLabel}</div>
          <div
            className="
              p-2 
              bg-[#4CAF50]
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
