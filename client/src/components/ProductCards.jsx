import React from "react";

const ProductCards = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2 sm:p-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-12 rounded-md bg-white shadow-sm">
          🚫 No products available
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 shadow-sm rounded-md p-5 hover:shadow-md transition duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              {product.name}
            </h3>

            {product.Category && (
              <p className="text-sm text-gray-600 mb-3 text-center">
                <span className="font-medium text-gray-700">Category:</span>{" "}
                {product.Category.name}
              </p>
            )}

            {product.ProductAttributes?.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {product.ProductAttributes.map((attr) => (
                  <li key={attr.id}>
                    <span className="font-medium">{attr.Attribute?.name}:</span>{" "}
                    {attr.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No attributes</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCards;
