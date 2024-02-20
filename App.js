import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainNavigation from "./app/navigation/MainNavigation";
import { CartContextProvider } from "./app/context/CartContext";
import { StatusBar } from "expo-status-bar";
import { ShopContextProvider } from "./app/context/ShopContext";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState();
  return (
    <UserContextProvider value={{ token, setToken, clearToken, user, setUser }}>
      <ShopContextProvider
        value={{ products, setProducts, categories, setCategories }}
      >
        <CartContextProvider value={{ cartItems, setCartItems }}>
          <StatusBar style="dark" animated />
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </CartContextProvider>
      </ShopContextProvider>
    </UserContextProvider>
  );
}