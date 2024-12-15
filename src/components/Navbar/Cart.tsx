import React from "react";
import { RxCross1 } from "react-icons/rx";

import { motion } from "framer-motion";
import CartView from "@/views/CartView";
const Cart = ({ setOpenCart, openCart }:any) => {

  return (
    <div className={`w-full fixed h-screen left-0 top-0 z-50 bg-[#0000006b]`}>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 h-full  w-[30%] sm:w-[60%] lg:w-[90%] flex flex-col justify-between shadow-sm bg-white overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}>
     
       <div className="w-full h-screen  items-center">
            <div className="px-5 py-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            {/* <h5>Cart items is empty!</h5>
            <Image  className="md:w-[120px] w-[100px]"
                        width={180}
                        height={80} src="https://media.istockphoto.com/id/1201115991/vector/shopping-cart.jpg?s=612x612&w=0&k=20&c=5GyX3yP_D8bDmUDEjR06osSzPjVtVfsdU1_zeohpOxk=" alt="" /> */}
    <CartView/>
          </div>
      </motion.div>
    </div>
  );
};

export default Cart;
