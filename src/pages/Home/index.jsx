import React from "react";

import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import ProductCard from "../../components/card/Card";
import HeroAtLast from "../../components/hero/HeroAtLast";
import { useProductContext } from "../../context/ProductContext";
import Loader from "../../assets/loading.gif";
import NewsSection from "../../components/news/NewsSection";

const Home = () => {
  const { products, loading } = useProductContext();

  if (loading)
    return (
      <div
        className="fixed z-[10000] flex h-full w-full items-center justify-center bg-white"
        style={{ left: 0, top: 0 }}
      >
        <img src={Loader} alt="Loading..." />
      </div>
    );

  const getCategoryProducts = (categoryName) => {
    return products.filter((product) => {
      return product.category.name === categoryName;
    });
  };

  const newProducts = products.slice(-(products.length - 1)).reverse();
  const bestSellers = products.sort((a, b) => b.sales - a.sales);
  const categoryProductsMomToBe = getCategoryProducts("Sữa cho bà bầu");
  const categoryProductsInfantMilk = getCategoryProducts("Sữa bột");
  const categoryProductsForBaby = getCategoryProducts("Dinh dưỡng cho bé");
  const milkForChildren = getCategoryProducts("Sữa dành cho trẻ em");
  const formulaMilk = getCategoryProducts("Sữa công thức");
  const foodSupplements = getCategoryProducts("Thực phẩm bổ sung");
  const freshMilk = getCategoryProducts("Sữa tươi");
  const nutritionForPregnantWomen = getCategoryProducts(
    "Dinh dưỡng cho mẹ bầu",
  );

  return (
    <div className="container mx-auto min-h-screen">
      <Hero />
      <ProductCard products={newProducts} headline={"Sản phẩm mới"} />
      <ProductCard products={bestSellers} headline={"Sản phẩm bán chạy"} />
      <SecondHero />
      <ProductCard
        products={categoryProductsMomToBe}
        headline={"Sữa cho bà bầu"}
      />
      <ProductCard
        products={categoryProductsInfantMilk}
        headline={"Sữa dành cho trẻ sơ sinh"}
      />
      <ProductCard
        products={categoryProductsForBaby}
        headline={"Dinh dưỡng cho bé"}
      />
      <ProductCard
        products={nutritionForPregnantWomen}
        headline={"Dinh dưỡng cho mẹ bầu"}
      />
      <HeroAtLast />
      <ProductCard
        products={milkForChildren}
        headline={"Sữa dành cho trẻ em"}
      />
      <ProductCard products={formulaMilk} headline={"Sữa công thức"} />
      <ProductCard products={foodSupplements} headline={"Thực phẩm bổ sung"} />
      <ProductCard products={freshMilk} headline={"Sữa tươi"} />
      <NewsSection />
    </div>
  );
};

export default Home;
