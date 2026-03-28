import React from "react";
import MegaMenu from "./MegaMenu";
import { useState } from "react";
import { icons } from "../../../assets/images";
import { productCategoryData } from "../../../constants/productCategoryData";
import { Link } from "react-router-dom";

const NavbarMenu = () => {

    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <nav className="nav select-none w-full flex justify-center">
      <ul className="flex gap-10">
        <li className="onHoverGreen cursor-pointer"><Link to="/products">Products</Link></li>
        <li
          className="relative flex items-center gap-1"
          onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
        >
          <span
            className="cursor-pointer onHoverGreen"
          >
            Shop By Category
          </span>
          <span className="onHoverGreen">
            {isMegaMenuOpen ? <icons.upIcon /> : <icons.downIcon />}
          </span>
          {isMegaMenuOpen && (
            <MegaMenu categories={productCategoryData} />
          )}
        </li>
        <li className="onHoverGreen cursor-pointer"><Link to="/deal-of-the-day">Deal of the Day</Link></li>
        <li className="onHoverGreen cursor-pointer"><Link to="/combo-offers">Combo Offers</Link></li>
        <li className="onHoverGreen cursor-pointer"><Link to="/track-order">Track Order</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarMenu;
