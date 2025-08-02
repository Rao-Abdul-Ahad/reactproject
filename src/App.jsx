import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increment = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrement = (id) => {
    setCart(cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">🛍️ My Store</h1>
        <div className="cart" onClick={() => setIsCartOpen(true)}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="cart"
            className="cart-icon"
          />
          <span className="cart-count">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </div>

      {/* Slide-in Cart */}
      <div className={`cart-slidebar ${isCartOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-details">
                  <p className="item-title">{item.title}</p>
                  <p className="item-price">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <div className="quantity-controls">
                    <button onClick={() => increment(item.id)}>+</button>
                    <button onClick={() => decrement(item.id)}>-</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <hr />
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>

      {/* Products */}
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
