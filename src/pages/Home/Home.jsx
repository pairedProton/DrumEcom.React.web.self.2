import React from "react";
import BannerSection from "../../components/sections/home/BannerSection";
import CategorySection from "../../components/sections/home/CategorySection";
import CategoryProductSection from "../../components/sections/home/CategoryProductSection";
import { ImmunityCategoryData } from "../../constants/ImmunityCategoryData";
import { BestSellersData } from "../../constants/bestSellingData";
import ReelSection from "../../components/sections/home/ReelSection";
import { homeReelData } from "../../constants/homeReelData";
import { saleOfTheDayData } from "../../constants/saleOfTheDayData";
import ProductMeritSection from "../../components/sections/home/ProductMeritSection";
import { ProductMerits } from "../../constants/productMeritData";
import ReviewSection from "../../components/sections/home/ReviewSection";
import { reviewsData } from "../../constants/reviewData";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <BannerSection />
      <CategorySection />
      <CategoryProductSection
        products={ImmunityCategoryData}
        title="Immunity Boosters"
      />
      <CategoryProductSection
        products={BestSellersData}
        title="Best Selling Products"
      />
      <ReelSection videoData={homeReelData} />
      <CategoryProductSection
        products={saleOfTheDayData}
        title="Sale Of The Day"
      />
      <ProductMeritSection {...ProductMerits[0]}></ProductMeritSection>
      <ProductMeritSection {...ProductMerits[1]}></ProductMeritSection>
      <ReviewSection reviewsData={reviewsData} />
      <ProductMeritSection {...ProductMerits[2]}></ProductMeritSection>
    </div>
  );
};

export default Home;
