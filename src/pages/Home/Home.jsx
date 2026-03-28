import React from "react";
import BannerSection from "../../components/sections/home/BannerSection";
import CategorySection from "../../components/sections/home/CategorySection";
import CategoryProductSection from "../../components/sections/home/CategoryProductSection";
import { ImmunityCategoryData } from "../../constants/ImmunityCategoryData";
import { BestSellersData } from "../../constants/bestSellingData";
import ReelSection from "../../components/sections/home/ReelSection";
import { homeVideos } from "../../assets/images";
import { homeReelData } from "../../constants/homeReelData";
import { saleOfTheDayData } from "../../constants/saleOfTheDayData";
import ProductMeritSection from "../../components/sections/home/ProductMeritSection";
import { ProductMerits } from "../../constants/productMeritData";
import ReviewSection from "../../components/sections/home/ReviewSection";
import { reviewsData } from "../../constants/reviewData";
import { usePopularProducts } from "../../hooks/usePopularProducts";



const Home = () => {
  const {popularProducts,loading,error} = usePopularProducts();
  return (
    <div className="w-full flex flex-col gap-10">
      <BannerSection />
      <CategorySection />
      <CategoryProductSection
        products={popularProducts}
        loading={loading}
        error={error}
        title="Immunity Boosters"
      />
      <CategoryProductSection
        products={popularProducts}
        loading={loading}
        error={error}
        title="Best Selling Products"
      />
      {/* <ReelSection  videoData={Object.values(homeVideos)}/> */}
      <ReelSection videoData={homeReelData} />
      <CategoryProductSection 
        products={popularProducts}
        loading={loading}
        error={error}
        title="Sale Of The Day" />
      <ProductMeritSection {...ProductMerits[0]}></ProductMeritSection>
      <ProductMeritSection {...ProductMerits[1]}></ProductMeritSection>
      <ReviewSection reviewsData={reviewsData} />
      <ProductMeritSection {...ProductMerits[2]}></ProductMeritSection>
    </div>
  );
};

export default Home;
