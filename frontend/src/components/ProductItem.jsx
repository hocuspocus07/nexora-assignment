import React,{useState} from "react";
import { useCart } from "../context/cartContext";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ProductOverview from "./ProductOverview";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const handleAdd = () => addToCart(product._id, 1);
  const [showOverview, setShowOverview] = useState(false);

  return (
    <>
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
        ⭐ {product.rating?.toFixed(1) || "4.5"}
      </div>

      {/* Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-52 object-cover"
onClick={() => setShowOverview(true)}
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-900 font-semibold text-base truncate">
          {product.name}
        </h3>
        <p className="text-gray-700 text-sm mt-1 mb-3">${product.price.toFixed(2)}</p>

        <button
          onClick={handleAdd}
          className="mt-auto bg-gray-900 text-white rounded-lg py-2 font-medium text-sm flex items-center justify-center gap-1 hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Add
        </button>
      </div>
    </motion.div>
    {showOverview && (
        <ProductOverview
          product={product}
          onClose={() => setShowOverview(false)}
        />
      )}
    </>
  );
};

export default ProductItem;
