import React, { createContext } from "react";

const AccomodationContext = createContext();
export const AccomodationContextProvider = AccomodationContext.Provider;
export const AccomodationContextConsumer = AccomodationContext.Consumer;

export default AccomodationContext;
