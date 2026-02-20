'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./cartContext";

const CartIcon = () => {
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/dashboard/cart">
      <div className="relative bg-white dark:border-white rounded-[13px] p-2 flex items-center cursor-pointer">
        <Image src="/shopping-cart.png" alt="Cart" width={20} height={20} />
        {totalItems > 0 && (
          <span className="ml-1 text-xs font-bold text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
