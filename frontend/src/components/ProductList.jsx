import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 p-8">Loading products...</div>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductList;
