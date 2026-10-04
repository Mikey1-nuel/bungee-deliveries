"use client";

import { useState } from "react";

import Image from "next/image";

import { useMutation } from "@apollo/client/react";

import toast from "react-hot-toast";

import { useCart } from "@/app/components/cartContext";

import { CHECKOUT_CART } from "@/graphql/mutations/order.mutations";

import { CheckoutCartResponse, CheckoutCartVariables } from "@/app/types/type";

const CartPage = () => {
  const {
    cartItems,
    removeItem,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [checkoutCart, { loading: checkingOut }] = useMutation<
    CheckoutCartResponse,
    CheckoutCartVariables
  >(CHECKOUT_CART);

  //
  // EMPTY
  //

  if (cartItems.length === 0) {
    return (
      <div
        className="
          bg-white
          rounded-[30px_30px_0_0]
          p-[35px_45px]
          flex
          flex-col
          items-center
          gap-3
          h-full
        "
      >
        <div
          className="
            w-[100px]
            h-[100px]
            relative
            rounded-full
            overflow-hidden
            bg-gray-100
            flex
            items-center
            justify-center
          "
        >
          <Image
            src="/shopping-cart.png"
            alt="Cart"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        <h2
          className="
            text-2xl
            font-semibold
            text-[#391713]
          "
        >
          Your cart is empty
        </h2>

        <p className="text-gray-500">Add menus to cart to continue</p>
      </div>
    );
  }

  //
  // CREATE ORDER
  //

  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty");

      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Delivery address is required");

      return;
    }

    try {
      const response = await checkoutCart({
        variables: {
          input: {
            deliveryAddress: deliveryAddress.trim(),

            items: cartItems.map((item) => ({
              restaurantMenuId: item.restaurant_menu_id,

              quantity: item.quantity,
            })),
          },
        },
      });

      console.log("Checkout response:", response);

      const result = response.data?.checkoutCart;

      if (!result) {
        throw new Error("Checkout failed: no checkout result returned");
      }

      toast.success(
        result.orderCount > 1
          ? `${result.orderCount} orders placed successfully`
          : "Order placed successfully",
      );

      clearCart();

      setDeliveryAddress("");
    } catch (error: any) {
      console.error("Checkout failed:", error);

      toast.error(error.message || "Failed to checkout cart");
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-[30px_30px_0_0]
        p-[35px_45px]
        flex
        flex-col
        gap-4
        h-screen
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
          text-[#391713]
          flex
          items-center
          gap-2
        "
      >
        Your Cart
        <span
          className="
            bg-red-500
            text-white
            rounded-full
            w-6
            h-6
            flex
            items-center
            justify-center
            text-sm
          "
        >
          {totalItems}
        </span>
      </h2>

      <div
        className="
          grid
          grid-cols-[3fr_1fr]
          gap-4
          w-full
        "
      >
        <div
          className="
            bg-[#F3E9B5]
            rounded-xl
            overflow-hidden
          "
        >
          {cartItems.map((item) => (
            <div
              key={item.restaurant_menu_id}
              className="
                flex
                justify-between
                border-b
                border-orange-100
                p-4
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    w-20
                    h-20
                    relative
                    rounded-lg
                    overflow-hidden
                    bg-white
                  "
                >
                  <Image
                    src={item.menu_image || "/placeholder.png"}
                    alt={item.menu_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">{item.menu_name}</h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    {item.restaurant_name}
                  </p>

                  <p
                    className="
                      text-xs
                      capitalize
                      text-gray-400
                    "
                  >
                    {item.menu_type}
                  </p>

                  <p
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-col
                  items-end
                "
              >
                <p className="font-semibold">
                  ₦{item.total_price.toLocaleString()}
                </p>

                <button
                  onClick={() => removeItem(item.restaurant_menu_id)}
                  className="
                    text-red-500
                    text-sm
                    mt-2
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
            bg-[#F3E9B5]
            rounded-xl
            p-4
            h-fit
          "
        >
          <h3
            className="
              font-semibold
              mb-4
            "
          >
            Cart Summary
          </h3>

          <div className="space-y-3">
            <div
              className="
                flex
                justify-between
                text-sm
              "
            >
              <span>Total Items</span>

              <span>{totalItems}</span>
            </div>

            <div
              className="
                flex
                justify-between
                text-sm
              "
            >
              <span>Subtotal</span>

              <span>₦{totalAmount.toLocaleString()}</span>
            </div>

            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address"
              className="
                w-full
                min-h-[120px]
                rounded-lg
                border
                p-3
                resize-none
                outline-none
              "
            />

             <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="
                w-full
                bg-[#391713]
                text-white
                py-3
                rounded-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {checkingOut
                ? "Processing..."
                : `Proceed To Checkout (₦${totalAmount.toLocaleString()})`}
            </button>

            <button
              onClick={clearCart}
              className="
                w-full
                bg-red-500
                text-white
                py-3
                rounded-lg
              "
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
