import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

// Animation for the backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Animation for the modal itself
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.8 },
};

const ReceiptModal = ({ receipt, onClose }) => {
  return (
    <motion.div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
  variants={backdropVariants}
>
  <motion.div
    className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
    variants={modalVariants}
  >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 text-center mb-6">Your order is complete.</p>
          
          <div className="w-full bg-gray-50 rounded-md p-4 space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Confirmation ID:</span>
              <span className="font-medium text-gray-800 truncate">{receipt.confirmationId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-800">{new Date(receipt.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-700">Total Paid:</span>
              <span className="text-gray-900">${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3 self-start">Items Purchased</h3>
          <ul className="w-full space-y-2 text-sm max-h-32 overflow-y-auto mb-6">
            {receipt.itemsPurchased.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-500">(x{item.quantity})</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onClose} 
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium 
                       hover:bg-gray-700 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptModal;