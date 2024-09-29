import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from "../pages/Header_Footer/header";
import Footer from "../pages/Header_Footer/footer";
import Cart from "../components/Cart/Cartbox";

interface LayoutContextProps {
  isMenuOpen: boolean;
  isCartVisible: boolean;
  handleBurgerClick: () => void;
  toggleCartVisibility: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

const Layoutform = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleBurgerClick = () => {
    if(!isMenuOpen){
      setIsMenuOpen(!isMenuOpen);
      setCartVisible(false);
     }
     else{
      setIsMenuOpen(false);
      setCartVisible(false);
     }
  };

  const toggleCartVisibility = () => {
    if(!isCartVisible){
     setCartVisible(!isCartVisible);
     setIsMenuOpen(false);
    }
    else{
     setCartVisible(false);
     console.log(isCartVisible);
     setIsMenuOpen(false);
    }
   };

  useEffect(() => {
    setCartVisible(false);
  }, [location]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
  //       setCartVisible(false);
  //     }
  //   };

  //   if (isCartVisible) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isCartVisible]);

  return (
    <LayoutContext.Provider value={{ isMenuOpen, isCartVisible, handleBurgerClick, toggleCartVisibility }}>
      <Header onBurgerClick={handleBurgerClick} onSVGclick={toggleCartVisibility} />
      {isCartVisible && <div ref={cartRef}><Cart /></div>}
      <Outlet />
      <Footer />
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutContextProvider");
  }
  return context;
};

export default Layoutform;
