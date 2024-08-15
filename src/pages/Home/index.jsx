import React from "react";

import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import ProductCard from "../../components/card/Card";
import HeroAtLast from "../../components/hero/HeroAtLast";
import MainFooter from "../../components/Footer/index";
import { useProductContext } from "../../context/ProductContext";
import Loader from "../../assets/loading.gif";

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
  const categoryProductsYogurt = getCategoryProducts("Sữa chua");
  const categoryProductsNut = getCategoryProducts("Sữa hạt");

  return (
    <div className="container mx-auto min-h-screen">
      <Hero />
      <ProductCard products={newProducts} headline={"Sản phẩm mới"} />
      <ProductCard products={bestSellers} headline={"Sản phẩm bán chạy"} />
      <SecondHero />
      <ProductCard
        products={categoryProductsMomToBe}
        headline={"Sữa dành cho mẹ bầu"}
      />
      <ProductCard
        products={categoryProductsInfantMilk}
        headline={"Sữa dành cho trẻ sơ sinh"}
      />
      <HeroAtLast />
      <ProductCard products={categoryProductsYogurt} headline={"Sữa chua"} />
      <ProductCard products={categoryProductsNut} headline={"Sữa hạt"} />
      <MainFooter />
    </div>
  );
};

export default Home;
