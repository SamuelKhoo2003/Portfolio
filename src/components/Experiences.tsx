import React from "react";
import { AnimatedButton } from "@/components/ui/animatedButton";

export const workExperience = [
    {
      id: 1,
      title: "Fullstack Engineering Intern",
      desc: "Assisted in the development of a fitness app for both iOS & Android platforms using React Native.",
      className: "md:col-span-2",
      thumbnail: "/assets/runnatransparent.png",
      url: "https://www.runna.com/",
    },
    {
      id: 2,
      title: "Software Engineering Intern",
      desc: "Spearheaded the development of a web-based 3D viewer using Django and Javascript.",
      className: "md:col-span-2",
      thumbnail: "/assets/suncon-modified.png",
      url: "https://www.sunwayconstruction.com.my/",
    },
]
const Experience = () => {
  return (
    <div className="py-10 w-full">
      <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <AnimatedButton
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={() => {
              if (card.url) {
                window.open(card.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl text-white md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white mt-3">
                  {card.desc}
                </p>
              </div>
            </div>
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
};

export default Experience;
