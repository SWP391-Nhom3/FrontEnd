import React, { useState, useEffect } from "react";
import Hero from "../../components/hero/Hero";
import SecondHero from "../../components/hero/SecondHero";
import ProductCard from "../../components/card/Card";
import HeroAtLast from "../../components/hero/HeroAtLast";
import axios from "../../utils/axios";

const Home = () => {
  const [momProducts, setMomProducts] = useState([]);
  const [babyProducts, setBabyProducts] = useState([]);

  useEffect(() => {
    // Fetch products for mom
    const fetchMomProducts = async () => {
      try {
        const response = await axios.get("/products/mom");
        console.log(response.data);
        setMomProducts(response.data);
      } catch (error) {
        console.error("Error fetching products for mom:", error);
      }
    };

    // Fetch products for baby
    const fetchBabyProducts = async () => {
      try {
        const response = await axios.get("/products/baby");
        console.log(response.data);
        setBabyProducts(response.data);
      } catch (error) {
        console.error("Error fetching products for baby:", error);
      }
    };

    fetchMomProducts();
    fetchBabyProducts();
  }, []);

  return (
    <div className="container mx-auto min-h-screen">
      <Hero />
      <ProductCard products={momProducts} headline={"Sữa dành cho mẹ bầu"} />
      <ProductCard
        products={babyProducts}
        headline={"Sữa dành cho trẻ sơ sinh"}
      />
      <SecondHero />
      <HeroAtLast />
      {/* Bạn có thể thêm các ProductCard khác nếu cần */}
    </div>
  );
};

export default Home;
