import React from "react";

import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import ProductCard from "../../components/card/Card";
import HeroAtLast from "../../components/hero/HeroAtLast";
import Header from "../Header";

const Home = () => {
  const mockProducts = [
    {
      _id: "1",
      product_name: "Sữa Bầu Anmum Materna",
      price: 350000,
      discount: 10,
      rating: 4.5,
      imgUrl: "https://via.placeholder.com/150",
      amount: 10,
      isActive: true,
    },
    {
      _id: "2",
      product_name: "Sữa Bầu Friso Gold Mum",
      price: 450000,
      discount: 15,
      rating: 4.7,
      imgUrl: "https://via.placeholder.com/150",
      amount: 20,
      isActive: true,
    },
    {
      _id: "3",
      product_name: "Sữa Bầu Meiji Mama",
      price: 400000,
      discount: 5,
      rating: 4.2,
      imgUrl: "https://via.placeholder.com/150",
      amount: 15,
      isActive: true,
    },
    {
      _id: "4",
      product_name: "Sữa Bầu Morinaga",
      price: 380000,
      discount: 20,
      rating: 4.8,
      imgUrl: "https://via.placeholder.com/150",
      amount: 0,
      isActive: true,
    },
    {
      _id: "5",
      product_name: "Sữa Bầu XO",
      price: 420000,
      discount: 10,
      rating: 4.3,
      imgUrl: "https://via.placeholder.com/150",
      amount: 5,
      isActive: true,
    },
    {
      _id: "6",
      product_name: "Sữa Bầu Enfamama",
      price: 360000,
      discount: 0,
      rating: 4.0,
      imgUrl: "https://via.placeholder.com/150",
      amount: 8,
      isActive: true,
    },
    {
      _id: "7",
      product_name: "Sữa Bầu Abbott Similac Mom",
      price: 370000,
      discount: 5,
      rating: 4.1,
      imgUrl: "https://via.placeholder.com/150",
      amount: 3,
      isActive: true,
    },
    {
      _id: "8",
      product_name: "Sữa Bầu Matilia",
      price: 450000,
      discount: 25,
      rating: 4.9,
      imgUrl: "https://via.placeholder.com/150",
      amount: 12,
      isActive: true,
    },
    {
      _id: "9",
      product_name: "Sữa Bầu Dielac Mama",
      price: 320000,
      discount: 10,
      rating: 3.9,
      imgUrl: "https://via.placeholder.com/150",
      amount: 6,
      isActive: true,
    },
    {
      _id: "10",
      product_name: "Sữa Bầu Nutricare Mom",
      price: 340000,
      discount: 0,
      rating: 4.6,
      imgUrl: "https://via.placeholder.com/150",
      amount: 7,
      isActive: true,
    },
    {
      _id: "11",
      product_name: "Sữa Bầu Anmum Materna Vanilla",
      price: 350000,
      discount: 15,
      rating: 4.4,
      imgUrl: "https://via.placeholder.com/150",
      amount: 11,
      isActive: true,
    },
    {
      _id: "12",
      product_name: "Sữa Bầu Friso Gold Mum Hương Cam",
      price: 450000,
      discount: 10,
      rating: 4.8,
      imgUrl: "https://via.placeholder.com/150",
      amount: 13,
      isActive: true,
    },
  ];

  return (
    <div className="container mx-auto min-h-screen">
      <Header />
      <Hero />
      <ProductCard products={mockProducts} headline={"Sản phẩm mới"} />
      <ProductCard products={mockProducts} headline={"Sản phẩm bán chạy"} />
      <SecondHero />
      <ProductCard products={mockProducts} headline={"Sữa dành cho mẹ bầu"} />
      <ProductCard
        products={mockProducts}
        headline={"Sữa dành cho trẻ sơ sinh"}
      />
      <HeroAtLast />
      {/* <CategoryGrid /> */}
      <ProductCard products={mockProducts} headline={"Sữa chua"} />
      <ProductCard products={mockProducts} headline={"Sữa hạt"} />
    </div>
  );
};

export default Home;
