"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbMathFunction, TbBooks } from "react-icons/tb";
import {
  GiPencilBrush,
  GiComputing,
  GiMaterialsScience,
  GiBookshelf,
} from "react-icons/gi";
import { FaComputer, FaBusinessTime } from "react-icons/fa6";
import { BsCodeSlash } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdScience,
  MdAccountBalance,
  MdOutlineScience,
  MdBiotech,
} from "react-icons/md";
import { RiEnglishInput } from "react-icons/ri";
import { LiaLanguageSolid } from "react-icons/lia";
import { GrMoney, GrTag } from "react-icons/gr";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Mathematics",
    icon: TbMathFunction,
    description: "Mathematics for school kids.",
  },
  {
    label: "Science",
    icon: MdScience,
    description: "Science for school kids.",
  },
  {
    label: "English",
    icon: RiEnglishInput,
    description: "English for school kids.",
  },
  {
    label: "Languages",
    icon: LiaLanguageSolid,
    description:
      "All languages including Sinhala and Tamil as a subject for school kids.",
  },
  {
    label: "Computer Programming",
    icon: BsCodeSlash,
    description: "Basic couputer programming.",
  },
  {
    label: "Computer Science",
    icon: FaComputer,
    description: "All about computer sciemce.",
  },
  {
    label: "Business Studies",
    icon: FaBusinessTime,
    description: "Business studies for A/L students.",
  },
  {
    label: "Accounting",
    icon: MdAccountBalance,
    description: "Accounting for A/L students.",
  },
  {
    label: "Art",
    icon: GiPencilBrush,
    description: "Art for A/L students.",
  },
  {
    label: "ICT",
    icon: GiComputing,
    description: "ICT for school kids.",
  },
  {
    label: "Physics",
    icon: GiMaterialsScience,
    description: "Physics for A/L students.",
  },
  {
    label: "Chemistry",
    icon: MdOutlineScience,
    description: "Chemistry for A/L students.",
  },
  {
    label: "Biology",
    icon: MdBiotech,
    description: "Biology for A/L students.",
  },
  {
    label: "A/L & O/L Subjects",
    icon: GiBookshelf,
    description: "A/L and O/L subjects for students.",
  },
  {
    label: "University Subject ",
    icon: TbBooks,
    description: "All subjects that teach in university level.",
  },
  {
    label: "Others",
    icon: GrTag,
    description: "All other subjects.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/" || pathname === "/dashboard";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
