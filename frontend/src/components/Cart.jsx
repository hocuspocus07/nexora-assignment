import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import CheckoutForm from "./CheckoutForm";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

const Cart = ({ isMobile = false, closeModal }) => {
  const { cartItems, total, removeFromCart, addToCart, decreaseQuantity } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const shippingFee = 9.8;
  const subtotal = total;
  const grandTotal = subtotal + shippingFee;

  return (
    <div
      className={`bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 ${
        isMobile ? "block" : "hidden sm:block"
      }`}
    >
      <AnimatePresence mode="wait">
        {showCheckout ? (
          <motion.div
            key="checkout"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            <CheckoutForm
              cartItems={cartItems}
              total={total}
              onBack={() => setShowCheckout(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center text-gray-500 py-10">
                <ShoppingBag className="w-16 h-16" />
                <p className="mt-4 text-lg font-medium">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-5 mb-6">
                  {cartItems.map((item) => {
                    const product = item.product || {};
                    return (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-between items-center border-b border-gray-100 pb-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.imageUrl ||
                              "https://via.placeholder.com/80x80?text=No+Image"
                            }
                            alt={product.name || "Product"}
                            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm">
                              {product.name || "Unnamed Product"}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg px-2 h-6">
                            <button
                              className="p-1 text-gray-600 hover:text-gray-900"
                              onClick={() => decreaseQuantity(item._id)}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-sm font-medium text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              className="p-1 text-gray-600 hover:text-gray-900"
                              onClick={() => addToCart(product._id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900 text-sm text-right">
                              ${product.price ? product.price.toFixed(2) : "0.00"}
                            </p>
                            <button
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove item"
                              onClick={() => removeFromCart(item._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping fee</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      USD ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Confirm Order
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
