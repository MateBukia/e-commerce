import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/homePage';
import ProductPage from './pages/product/productCategory_page';
import ProductDetail from './pages/productdetail/productdetail';
import Layoutform from './Layouts/layout';
import useScrollToTop from './hooks/scrolltotop';
import { CartProvider } from './Context/CartContext'; 
import Cart from './components/Cart/Cartbox'; 
import ErrorPage from './pages/ErrorPage/Error';
import Checkout from './pages/CheckoutPage/Checkout';

interface ScrollToTopWrapperProps {
  children: React.ReactNode;
}

const ScrollToTopWrapper: React.FC<ScrollToTopWrapperProps> = ({ children }) => {
  useScrollToTop();
  return <>{children}</>;
};

const App = () => {

  return (
    <Router>
      <CartProvider> 
        <ScrollToTopWrapper>
          <div className="App">
            <Routes>
              <Route path="*" element={<ErrorPage/>} />
              <Route element={<Layoutform />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:productName" element={<ProductPage />} />
                <Route path="/products/:productName/:productId" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </div>
        </ScrollToTopWrapper>
      </CartProvider>
    </Router>
  );
};

export default App;
