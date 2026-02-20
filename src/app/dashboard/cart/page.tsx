"use client";
import { useCart } from "@/app/components/cartContext";
import Image from "next/image";

const CartPage = () => {
  const { items, removeItem, clearCart } = useCart();

  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col justify-start items-center gap-[5px] h-full">
        <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden bg-gray-100 flex justify-center items-center">
          <Image
            src="/shopping-cart.png"
            alt="item"
            width={70}
            height={70}
            className="object-contain p-[5px]"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-[#391713]">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Add meals to your cart to place an order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col justify-start items-start gap-[10px] h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-[#391713] flex items-center gap-[5px]">
        Your Cart
        {totalItems > 0 && (
          <span className="ml-1 text-[16px] font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </h2>
      <div className="grid grid-cols-[3fr_1fr] items-start gap-[10px] w-full">
        <div className="shadow-sm hover:shadow-md transition w-full bg-[#F3E9B5]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-orange-100 rounded-lg p-4"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image ?? "/placeholder.png"}
                    alt={item.mealName}
                    fill
                    className="object-contain rounded-[10px]"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{item.mealName}</h3>
                  <p className="text-xs text-gray-500">{item.restaurantName}</p>
                  {item.extras.length > 0 && (
                    <p className="text-xs text-gray-400">
                      Extras: {item.extras.map((e) => e.name).join(", ")}
                    </p>
                  )}
                  <p className="text-sm font-medium">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="flex flex-col items-end h-full">
                <p className="font-semibold">
                  ₦{item.totalPrice.toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm mt-2 flex justify-center items-center gap-[5px]"
                >
                  <Image
                    src="/delete.png"
                    alt="Delete Icon"
                    width={15}
                    height={15}
                  />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start bg-[#F3E9B5] shadow-lg hover:shadow-md transition w-full">
          <h3 className="uppercase border-b border-orange-100 w-full p-[5px_8px] text-[14px] font-[500]">
            Cart Summary
          </h3>

          <div className="text-right w-full">
            <p className="font-semibold w-full flex justify-between items-center border-b border-orange-100 w-full p-[5px_10px] text-[12px] font-[500]">
              Subtotal:
              <span className="text-[16px]">
                ₦{totalPrice.toLocaleString()}
              </span>
            </p>

            <div className="flex flex-col justify-start items-start w-full mt-[1px] gap-[10px] p-[10px] text-[12px]">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white py-2 px-4 rounded-lg w-full"
              >
                Clear Cart
              </button>
              <button className="w-full bg-[#391713] text-white py-2 rounded-lg">
                Proceed to Checkout (₦{totalPrice.toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
