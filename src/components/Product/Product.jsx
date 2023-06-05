import React, { useEffect, useState } from "react";
import product1 from "../../assets/images/image-product-1.jpg";
import product2 from "../../assets/images/image-product-2.jpg";
import product3 from "../../assets/images/image-product-3.jpg";
import product4 from "../../assets/images/image-product-4.jpg";
import prev from "../../assets/images/icon-previous.svg";
import next from "../../assets/images/icon-next.svg";
import minus from "../../assets/images/icon-minus.svg";
import plus from "../../assets/images/icon-plus.svg";
import cart from "../../assets/images/icon-cart-light.svg";
import thumb1 from "../../assets/images/image-product-1-thumbnail.jpg";
import thumb2 from "../../assets/images/image-product-2-thumbnail.jpg";
import thumb3 from "../../assets/images/image-product-3-thumbnail.jpg";
import thumb4 from "../../assets/images/image-product-4-thumbnail.jpg";
import modalClose from "../../assets/images/icon-close-white.svg";
import "./Product.scss";
import useCartContext from "../../hooks/useCartContext";

const productsImages = [
  {
    id: 1,
    img: product1,
    thumb: thumb1,
  },
  {
    id: 2,
    img: product2,
    thumb: thumb2,
  },
  {
    id: 3,
    img: product3,
    thumb: thumb3,
  },
  {
    id: 4,
    img: product4,
    thumb: thumb4,
  },
];

const Product = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems, addToCart } = useCartContext();
  const [product, setProduct] = useState({
    id: 1,
    image: thumb1,
    name: "Fall Limited Edition Sneakers",
    price: 125,
    quantity: 1,
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (isModalOpen) {
      body.classList.add("opacity-75");
    } else {
      body.classList.remove("opacity-75");
    }
  }, [isModalOpen]);

  const changeImage = (direction) => {
    if (direction === "next") {
      setCurrentImage((prevImage) =>
        prevImage === productsImages.length - 1 ? 0 : prevImage + 1
      );
    } else if (direction === "prev") {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? productsImages.length - 1 : prevImage - 1
      );
    }
  };

  const handleThumbClick = (index) => {
    setCurrentImage(index);
  };

  const toggleModal = () => {
    if (window.innerWidth >= 1440) {
      setIsModalOpen(!isModalOpen);
    }
  };
  const handleQuantity = (operation) => {
    if (operation === "subtract" && quantity === 0) {
      return;
    }
  
    setQuantity((prevQty) =>
      operation === "subtract" ? prevQty - 1 : prevQty + 1
    );
  };
  
  const handleAddToCart = () => {
    const updatedProduct = {
      ...product,
      quantity: quantity
    };
  
    const productIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (productIndex === -1) {
      // El producto no está en el carrito, se agrega
      addToCart(updatedProduct);
    } else {
      // El producto ya está en el carrito, se actualiza la cantidad
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === productIndex) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };

  return (
    <main className="main">
      <div className="gallery">
        <figure className="currentImage">
          <img
            src={productsImages[currentImage].img}
            alt="Product"
            onClick={toggleModal}
          />
        </figure>
        <button className="prev" onClick={() => changeImage("prev")}>
          <img className="arrow" src={prev} alt="arrow previous" />
        </button>
        <button className="next" onClick={() => changeImage("next")}>
          <img className="arrow" src={next} alt="arrow next" />
        </button>
        <div className="thumbnails">
          {productsImages.map((image, index) => (
            <img
              key={image.id}
              className={`thumb ${index === currentImage ? "selected" : ""}`}
              src={image.thumb}
              alt="zapatilla"
              onClick={() => handleThumbClick(index)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <button className="modalClose" onClick={toggleModal}>
            <img src={modalClose} alt="cerrar" />
          </button>
          <figure className="currentImage">
            <img
              src={productsImages[currentImage].img}
              alt="Product"
              onClick={toggleModal}
            />
          </figure>
          <button className="prev" onClick={() => changeImage("prev")}>
            <img className="arrow" src={prev} alt="arrow previous" />
          </button>
          <button className="next" onClick={() => changeImage("next")}>
            <img className="arrow" src={next} alt="arrow next" />
          </button>
          <div className="thumbnails">
            {productsImages.map((image, index) => (
              <img
                key={image.id}
                className="thumb"
                src={image.thumb}
                alt="zapatilla"
                onClick={() => handleThumbClick(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="wrapper">
        <div className="productInfo">
          <h2 className="company">SNEAKER COMPANY</h2>
          <h3 className="name">Fall Limited Edition Sneakers</h3>
          <p className="description">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="prices">
            <div className="priceDiscount">
              <p className="price">$125.00</p>
              <p className="discount">50%</p>
            </div>
            <p className="originalPrice">$250.00</p>
          </div>

          <div className="quantityAddToCart">
            <div className="quantityBar">
              <img
                className="icon"
                src={minus}
                alt="signo menor"
                onClick={() => handleQuantity("subtract")}
              />
              <span className="currentQuantity">{quantity}</span>
              <img
                className="icon"
                src={plus}
                alt="signo mayor"
                onClick={() => handleQuantity("add")}
              />
            </div>

            <button className="addToCart" onClick={handleAddToCart}>
              <img className="cart" src={cart} alt="cart icon" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
