import React, { useState } from "react";
import * as api from "../services/api";
import { useCart } from "../context/cartContext";
import ReceiptModal from "./ReceiptModal";
import { ArrowLeft, Loader2, Mail, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CheckoutForm = ({ cartItems, total, onBack }) => {
  const { fetchCart } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Please fill out all fields.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    try {
      const checkoutData = { cartItems, total, ...formData };
      const { data } = await api.checkout(checkoutData);
      setReceipt(data);
      await fetchCart();
    } catch (err) {
      setError("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <motion.div
        className="sm:max-w-lg mx-auto bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm p-8 min-h-[480px] flex flex-col"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-700 mb-6 focus:outline-none transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Cart</span>
        </button>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
          Checkout
        </h3>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <User className="w-4 h-4 text-gray-400" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border border-gray-200 shadow-inner px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 font-medium bg-white/70 placeholder-gray-400 transition"
              placeholder="Enter your full name"
              required
              disabled={isProcessing}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Mail className="w-4 h-4 text-gray-400" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border border-gray-200 shadow-inner px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 font-medium bg-white/70 placeholder-gray-400 transition"
              placeholder="name@email.com"
              required
              autoComplete="email"
              disabled={isProcessing}
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 mt-1 font-semibold"
            >
              {error}
            </motion.p>
          )}
          <div className="pt-6 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base text-gray-500 font-semibold">Total:</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-900 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "Pay Now"}
            </button>
          </div>
        </form>
      </motion.div>
      {/* Modal Animation */}
      <AnimatePresence>
        {receipt && <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />}
      </AnimatePresence>
    </>
  );
};

export default CheckoutForm;
