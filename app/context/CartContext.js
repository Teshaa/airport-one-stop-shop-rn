import React, { createContext } from "react";

const CartContext = createContext();
export const CartContextProvider = CartContext.Provider;
export const CartContextConsumer = CartContext.Consumer;

export default CartContext;
