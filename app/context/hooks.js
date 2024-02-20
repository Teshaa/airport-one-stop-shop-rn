import { useContext } from "react";
import UserContext from "./UserContext";
import CartContext from "./CartContext";
import ShopContext from "./ShopContext";

export const useUserContext = () => {
  const { clearToken, user, setUser, token, setToken } =
    useContext(UserContext);
  return { clearToken, user, setUser, token, setToken };
};

export const useCartContext = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addToCart = ({ product, quantity }) => {
    const currentIndex = cartItems.findIndex(
      ({ product: prod }) => prod.url === product.url
    );
    if (currentIndex === -1) {
      // New product
      setCartItems([...cartItems, { product, quantity }]);
    } else {
      // update
      const items = [...cartItems];
      const itemToUpdate = items[currentIndex];
      items[currentIndex] = { ...itemToUpdate, quantity };
      setCartItems(items);
    }
  };
  const deleteFromCart = (product) => {
    setCartItems(
      cartItems.filter(({ product: prod }) => prod.url !== product.url)
    );
  };
  const clearAll = () => {
    setCartItems([]);
  };
  const getTotalCost = () => {
    const cost = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.product.price) * parseFloat(item.quantity),
      0
    );
    return cost;
  };
  const totalProducts = () => {
    const count = cartItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    return count;
  };
  const getPostItems = () => {
    const items = cartItems.map(({ product: { url: product }, quantity }) => ({
      product,
      quantity,
    }));
    return { items };
  };
  const getPostItemsFormData = () => {
    if (!cartItems) {
      throw new Error("cartItems is null or undefined");
    }
    const formData = new FormData();
    const items = cartItems.map(({ product: { url: product }, quantity }) => ({
      product,
      quantity,
    }));
    items.forEach((item, index) => {
      formData.append(`items[${index}][product]`, item.product);
      formData.append(`items[${index}][quantity]`, item.quantity);
    });
    return formData;
  };

  return {
    getPostItemsFormData,
    cartItems,
    addToCart,
    deleteFromCart,
    clearAll,
    totalCost: getTotalCost(),
    productCount: totalProducts(),
    postItems: getPostItems(),
  };
};

export const useShopContext = () => {
  const { products, setProducts, categories, setCategories } =
    useContext(ShopContext);
  return { products, categories, setProducts, setCategories };
};
