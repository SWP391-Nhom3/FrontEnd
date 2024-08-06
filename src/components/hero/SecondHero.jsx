import React from "react";
import banner from "../../assets/images/background/banner_baby.png";

function SecondHero() {
  return (
    <div
      className="relative mt-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})`, height: "500px" }}
    >
      <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
        <div className="ml-10 p-6 md:w-1/2 lg:w-2/3">
          <h1 className="mb-6 text-4xl font-bold text-black md:text-6xl lg:text-7xl">
            Sữa dành cho <br className="hidden md:block" />
            <span className="text-primary-700">Mẹ và Bé</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SecondHero;