import React from "react";
import { Link } from "react-router-dom";

const MegaMenu = ({categories}) => {
  return (
    <div
      className="absolute left-0 top-full mt-4 flex
                     shadow-xl rounded-xl p-8 gap-8 z-50 font-body bg-bg"
    >
      {categories.map((cat, index) => (
        <div key={index} className="flex flex-col gap-2 w-26">
          <Link to={`/products?category=${cat.id}`} className="block">
            <h4 className="font-semibold mb-3 onHoverGreen h-12 border-b border-gray-300">
              {cat.name}
            </h4>
          </Link>
          <ul className="space-y-3 text-gray-600">
            {cat.subcategories.map((sub, subIndex) => (
              <li key={subIndex} className="cursor-pointer onHoverGreenLight h-11">
                <Link to={`/products?category=${cat.id}&subcategory=${sub.id}`} className="block w-full h-full">
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MegaMenu;
