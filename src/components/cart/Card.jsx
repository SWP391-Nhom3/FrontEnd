import React from "react";

const Card = ({ product, onAdd, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md sm:flex-row">
      <div className="flex items-center space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 rounded object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="mt-1 text-sm font-semibold">Giá: {product.price} VND</p>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2 sm:mt-0">
        <button
          onClick={() => onDecrease(product.id)}
          className="rounded bg-gray-300 px-2 py-1 text-gray-700"
        >
          -
        </button>
        <span className="text-lg font-semibold">{product.quantity}</span>
        <button
          onClick={() => onIncrease(product)}
          className="rounded bg-gray-300 px-2 py-1 text-gray-700"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(product.id)}
        className="ml-4 mt-4 rounded bg-red-500 px-4 py-2 text-white sm:ml-0 sm:mt-0"
      >
        Xóa
      </button>
    </div>
  );
};

export default Card;
