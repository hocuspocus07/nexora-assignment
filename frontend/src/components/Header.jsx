import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";

const Header = () => {
  const { itemCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="backdrop-blur-md bg-white/70 border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <h1
            className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 select-none"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            E-Commerce
          </h1>

          {/* Cart Icon (Mobile + Desktop) */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setShowCart(true)}
              className="relative focus:outline-none"
            >
              <ShoppingCart className="h-7 w-7 text-gray-700 hover:text-gray-900 transition-colors" />
              <motion.div
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
              >
                {itemCount}
              </motion.div>
            </button>
          </div>

          {/* Desktop Cart Icon (non-interactive) */}
          <div className="hidden sm:block relative">
            <ShoppingCart className="h-7 w-7 text-gray-700 hover:text-gray-900 transition-colors" />
            <motion.div
              key={itemCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
            >
              {itemCount}
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Mobile Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-3 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCart(false);
            }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-4 relative"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <button
                onClick={() => setShowCart(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
              <Cart isMobile={true} closeModal={() => setShowCart(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
