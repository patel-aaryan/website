import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";
import { languages, frontend, backend, devops } from "./skills";

const skillsCategories = [
  { name: "Languages", list: languages },
  { name: "Frontend", list: frontend },
  { name: "Backend", list: backend },
  { name: "DevOps", list: devops },
];

interface SliderProps {
  category: {
    name: string;
    component: () => React.JSX.Element;
  }[];
}

// function Slider({ category }: SliderProps) {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState<boolean>(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="flex justify-evenly">
//       {category.map((c, index) => (
//         <div
//           key={index}
//           className={`mx-4 p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
//             mounted && theme === "dark"
//               ? "hover:bg-slate-800"
//               : "hover:bg-slate-50"
//           } hover:scale-125 link`}
//         >
//           {<c.component />}
//         </div>
//       ))}
//     </div>
//   );
// }

function Slider() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div></div>;
}

function Skills() {
  return (
    <>
      {/* {skillsCategories.map((category, index) => (
        <div key={index} className="mt-8 w-full">
          <h1 className="flex justify-center text-2xl text-bold mb-4">
            {category.name}
          </h1>
          {<Slider category={category.list} />}
        </div>
      ))} */}
      <Slider />
    </>
  );
}

export default Skills;
