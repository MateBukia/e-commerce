import { useState } from 'react';
import './Modal.css';
import { CartItem } from './Checkout';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  grandTotal: number;
}

const Modal = ({ show, handleClose, cart, totalPrice}: ModalProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!show) {
    return null;
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="32" fill="#D87D4A" />
          <path d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812" stroke="white" stroke-width="4" />
        </svg>
        <h1>THANK YOU FOR YOUR ORDER</h1>
        <h6>You will receive an email confirmation shortly.</h6>
        <div className='modal-products'>
          <ul>
            {isExpanded ? (
              cart.map((item) => (
                <li key={item.id}>
                  <img src={`../.${item.image.mobile}`} alt={item.name} />
                  <div className='modal-product-detail'>
                    <div>
                      <p>{item.name.split(" ")[0]}</p>
                      <h4>${item.price}</h4>
                    </div>
                    <h4>x{item.quantity}</h4>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <img src={`../.${cart[0].image.mobile}`} alt={cart[0].name} />
                <div className='modal-product-detail'>
                  <div>
                    <p>{cart[0].name.split(" ")[0]}</p>
                    <h4>${cart[0].price}</h4>
                  </div>
                  <h4>x{cart[0].quantity}</h4>
                </div>
              </li>
            )}
            <div className='line'></div>
             {cart.length > 1 && (
            <button className='toggle-button' onClick={handleToggle}>
              {isExpanded ? 'View Less' : `and ${cart.length - 1}  other item(s)`}
            </button>
          )}
          </ul>
          <div className="modal-grand-total">
            <span>GRAND TOTAL</span>
            <p>${totalPrice}</p>
          </div>
        </div>
        <button className="back-to-home"onClick={handleClose}>Back to Home</button>
      </div>
    </div>
  );
};

export default Modal;
