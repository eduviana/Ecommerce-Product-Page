import React, { useState } from "react";
import CartContext from "./CartContext";
import imgPrueba from "../assets/images/image-product-1-thumbnail.jpg";




const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState([]);


  // const addToCart = (product) => {
  //   setCartItems([...cartItems, product]);
  // }
  const addToCart = (product) => {
    const productIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (productIndex === -1) {
      // El producto no está en el carrito, se agrega
      setCartItems([...cartItems, product]);
    } else {
      // El producto ya está en el carrito, se actualiza la cantidad
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === productIndex) {
          return {
            ...item,
            quantity: item.quantity + product.quantity
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };

 const deleteFromCart = (id) => {
  const updatedCartItems = cartItems.filter(item => item.id !== id);
  setCartItems(updatedCartItems);
 }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
