import React from "react";
import hero_img from "../../assets/images/body/hero_img.jpg";

function Hero() {
  return (
    <div className="mt-5 bg-primary-200 py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              Chào mừng đến với <br className="hidden md:block" />
              <span className="text-black">MomBabyMilk</span> Website
            </h1>
            <p className="mb-8 text-lg text-gray-800 md:text-xl lg:text-2xl">
              Nơi cung cấp tất cả loại sữa dinh dưỡng cho mẹ và bé.
            </p>
            <div className="flex gap-2">
              <a
                href="/filter"
                className="rounded-md bg-primary-500 px-6 py-3 font-bold text-white hover:bg-primary-800"
              >
                Mua hàng
              </a>
              <a
                href="/about_us"
                className="rounded-md bg-gray-700 px-6 py-3 font-bold text-white hover:bg-gray-600"
              >
                Về chúng tôi
              </a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2 lg:w-1/3">
            <img
              src={hero_img}
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
