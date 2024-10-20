import Image from "next/image";
import React from "react";

const ImageWithText = ({
  image,
  title,
  description,
  swap,
}: {
  image: string;
  title: string;
  description: string;
  swap?: boolean;
}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-between bg-white ${
        swap ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full h-auto rounded">
        <Image
          src={image}
          alt={title}
          width={1500}
          height={1000}
          objectFit="cover"
          className="rounded"
        />
      </div>

      <div className={`w-full my-4 md:mt-0 p-4 md:p-0`}>
        <h4 className="md:px-10 text-4xl sm:text-2xl font-bold mb-2 text-left">
          {title}
        </h4>
        <p className="md:px-10 text-sm md:text-md xl:text-lg font-light">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ImageWithText;
