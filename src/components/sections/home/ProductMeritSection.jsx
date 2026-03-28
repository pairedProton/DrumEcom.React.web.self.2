import React from "react";

const ProductMeritSection = ({
  ImageUrl,
  title,
  desc,
  para,
  sectionStyle,
  btnColor,
}) => {
  return (
    <div className="container mx-auto w-full h-auto py-12 px-10 ">
      <div
        className={`w-full h-auto flex lg:flex-row  flex-col gap-8 items-center justify-center  ${sectionStyle}`}
      >
        <div className="w-[90%]  aspect-square  ">
          <img
            className="object-contain object-center w-full h-full rounded-2xl"
            src={ImageUrl}
            alt=""
          />
        </div>
        <div className=" w-full flex flex-col  gap-6 ">
          <h3 className="text-4xl font-medium font-heading">{title}</h3>
          <h4 className="text-3xl font-medium font-body ">{desc}</h4>
          <p className="text-base font-body">{para}</p>
          <button className={`${btnColor} text-white px-6 p-4 w-fit`}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductMeritSection;
