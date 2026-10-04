'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./cartContext";

const CartIcon = () => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/dashboard/cart">
      <div className="relative bg-white dark:border-white rounded-[13px] p-2 flex items-center cursor-pointer">
        <Image src="/shopping-cart.png" alt="Cart" width={20} height={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
