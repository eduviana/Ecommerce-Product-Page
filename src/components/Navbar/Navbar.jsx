import { useEffect, useState } from "react";
import useCartContext from "../../hooks/useCartContext";
import logo from "../../assets/images/logo.svg";
import hamburguer from "/src/assets/images/icon-menu.svg";
import cart from "/src/assets/images/icon-cart.svg";
import avatar from "/src/assets/images/image-avatar.png";
import remove from "/src/assets/images/icon-delete.svg";

import "./Navbar.scss";
import { formattedPrice } from "../../helpers/formattedPrices";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, deleteFromCart } = useCartContext();

  useEffect(() => {
    const body = document.querySelector("body");
    if (isMenuOpen) {
      body.classList.add("opacity-75");
    } else {
      body.classList.remove("opacity-75");
    }
  }, [isMenuOpen]);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="container">
          <div className="left">
            <img
              className="hamburger"
              src={hamburguer}
              alt="hamburger button"
              onClick={handleMenu}
            />
            <img className="logo" src={logo} alt="sneakers" />
            <ul className="ul">
              <li className="li">Collections</li>
              <li className="li">Men</li>
              <li className="li">Women</li>
              <li className="li">About</li>
              <li className="li">Contact</li>
            </ul>
          </div>
          <div className="right">
            <div className="cart-icon">
              <img src={cart} alt="cart" onClick={handleCart} />
              <span className="badge">{cartItems[0]?.quantity}</span>
            </div>
            <img className="avatar-icon" src={avatar} alt="profile" />
          </div>

          {isMenuOpen && (
            <div className="menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={handleMenu}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
              <ul className="ul">
                <li className="li">Collections</li>
                <li className="li">Men</li>
                <li className="li">Women</li>
                <li className="li">About</li>
                <li className="li">Contact</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isCartOpen && (
        <div className="cart">
          <div className="header">
            <h3 className="title">Cart</h3>
          </div>
          <div className="content">
            {cartItems.length === 0 ? (
              <p className="empty">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id}>
                  <div className="cartItem">
                    <img className="image" src={item.image} alt={item.name} />
                    <div className="infoContainer">
                      <p className="name">{item.name}</p>
                      <div className="priceQuantityTotal">
                        <p className="priceQuantity">
                          ${formattedPrice(item.price)} x {item.quantity}
                        </p>
                        <span className="total">
                          ${formattedPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <img
                      className="remove"
                      src={remove}
                      alt="trash remove item"
                      onClick={() => deleteFromCart(item.id)}
                    />
                  </div>
                  <button className="checkout">Checkout</button>
                </div>
              ))
            )}
            {/* <button className="checkout">Checkout</button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
