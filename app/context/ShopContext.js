import React, { createContext } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ShopContext.Provider;
export const ShopContextConsumer = ShopContext.Consumer;

export default ShopContext;
