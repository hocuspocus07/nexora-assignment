import React from 'react';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';

function App() {
  return (
    <div className="font-sans text-gray-900 w-screen h-full">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          
          {/* Product List */}
          <div className="lg:col-span-2">
            <ProductList />
          </div>

          {/* Cart (with sticky position on large screens) */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-6">
              <Cart />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;