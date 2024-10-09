import React from 'react';

const MultiShopCart = ({ cartData }) => {
  // Group cart items by shop
  const groupedByShop = cartData.reduce((acc, item) => {
    if (!acc[item.shop_id]) {
      acc[item.shop_id] = {
        shopInfo: item.shopInfo,
        products: []
      };
    }
    acc[item.shop_id].products.push(...item.products);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      {Object.entries(groupedByShop).map(([shopId, shopData]) => (
        <div key={shopId} className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src={shopData.shopInfo.logo}
              alt={`${shopData.shopInfo.name} logo`}
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{shopData.shopInfo.name}</h2>
              <p className="text-gray-600">{shopData.shopInfo.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopData.products.map((product) => (
              <div key={product._id} className="flex items-center border rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">
              Subtotal: ${shopData.products.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold">
          Total: ${Object.values(groupedByShop).reduce((total, shop) => 
            total + shop.products.reduce((sum, product) => sum + product.price, 0), 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MultiShopCart;