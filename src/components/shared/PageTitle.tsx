import React from "react";

interface PageTitleForHomeProps {
  title: string;
}

const PageTitleForHome = ({ title }: PageTitleForHomeProps) => {
  const divide = title?.split(" ");
  const greenText = divide[divide.length - 1];
  const blackText = divide.slice(0, -1);

  return (
    <div className="flex justify-start w-full relative lg:text-start text-center">
      <div>
        {/* The container holding the title */}
        <h1 className="text-4xl font-bold border-black pr-2  md:text-left text-center">
          {/* Rendering black text with left alignment */}
          {blackText.map((text: string) => (
            <span className="text-gray-900" key={text}>
              {text}{" "}
            </span>
          ))}
          {/* Rendering green text with left alignment and primary color */}
          <span className="text-gray-900">{greenText}</span>
        </h1>
        
      </div>
    </div>
  );
};

export default PageTitleForHome;
