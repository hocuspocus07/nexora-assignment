import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext";

const ProductOverview = ({ product, onClose }) => {
    const { addToCart } = useCart();
    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl overflow-y-scroll sm:overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center relative">
                        <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
                            ⭐ {product.rating?.toFixed(1) || '4.5'}
                        </div>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="max-h-[400px] object-contain p-4"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl font-semibold text-gray-800">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-gray-400 line-through text-sm">
                                        ${product.oldPrice.toFixed(2)}
                                    </span>
                                )}
                                {product.discount && (
                                    <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full font-medium">
                                        {product.discount}% Off
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {product.description ||
                                    'This is a high-quality product designed for comfort, durability, and modern style.'}
                            </p>

                            {/* Color Options */}
                            {product.colors && (
                                <div className="mb-4">
                                    <span className="block text-sm font-medium text-gray-700 mb-2">Color:</span>
                                    <div className="flex gap-2">
                                        {product.colors.map((color, i) => (
                                            <button
                                                key={i}
                                                className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-500"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Options */}
                            {product.sizes && (
                                <div className="mb-4">
                                    <span className="block text-sm font-medium text-gray-700 mb-2">Size:</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 focus:bg-gray-900 focus:text-white"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={() => addToCart(product._id, 1)}
                            className="mt-6 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductOverview;
