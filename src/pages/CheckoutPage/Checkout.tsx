import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css'; 
import Input from '../../components/Input/Input';
import Modal from './Modal';  
import { useLayoutContext } from '../../Layouts/layout';
import ProductPreview from '../../components/Product_Preview/product_preview';
import { useCart } from '../../Context/CartContext';


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productcount: number;
  image: {
    mobile: string;
  };
}

type FormFields = 'name' | 'email' | 'phone' | 'address' | 'zip' | 'city' | 'country' | 'eMoneyNumber' | 'eMoneyPin';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  eMoneyNumber: string;
  eMoneyPin: string;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state as { cart: CartItem[], totalPrice: number };
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cash">(
    "e-money"
  );
  const { clearCart } = useCart();
  const { isMenuOpen } = useLayoutContext();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    
    setFormData({ ...formData, [name]: value });
  
    
    validateField(name as FormFields, value);
  };
  
  const validateField = (name: FormFields, value: string) => {
    let error = '';
  
    switch (name) {
      case 'email':
        if (!validateEmail(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Invalid phone number format';
        }
        break;
      default:
        if (!value) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        break;
    }
  
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\+?\d+$/;
    return regex.test(phone);
  };

  const handleContinue = () => {
    const newErrors: FormErrors = { ...errors };
    let isValid = true;

    const fieldsToValidate: { name: FormFields; label: string; validate?: (value: string) => boolean }[] = [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email', validate: validateEmail },
      { name: 'phone', label: 'Phone', validate: validatePhone },
      { name: 'address', label: 'Address' },
      { name: 'zip', label: 'ZIP Code' },
      { name: 'city', label: 'City' },
      { name: 'country', label: 'Country' },
    ];

    fieldsToValidate.forEach(field => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      } else if (field.validate && !field.validate(formData[field.name])) {
        newErrors[field.name] = `Invalid ${field.label.toLowerCase()} format`;
        isValid = false;
      } else {
        newErrors[field.name] = '';
      }
    });

    if (paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber) {
        newErrors.eMoneyNumber = 'e-Money Number is required';
        isValid = false;
      } else {
        newErrors.eMoneyNumber = '';
      }
      if (!formData.eMoneyPin) {
        newErrors.eMoneyPin = 'e-Money PIN is required';
        isValid = false;
      } else {
        newErrors.eMoneyPin = '';
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
    clearCart();
  };

  return (
    <div className='checkout' id={isMenuOpen ? 'checkout-active' : ''}>
      <h3 onClick={handleGoBack}>Go Back</h3>
      {isMenuOpen && (
                <div className='popup-menu'>
                    <ProductPreview />
                </div>
            )}
      <div className="checkout-page">
        <div className="checkout-form">
          <h1>Checkout</h1>
          <div className="billing-details">
            <h2>Billing Details</h2>
            <div className="input-container">
              <Input 
                label="Name" 
                placeholder="Enter your name" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                isError={!!errors.name}
                errMsg={errors.name}
              />
           
              <Input 
                label="Email" 
                placeholder="Enter your email" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                isError={!!errors.email}
                errMsg={errors.email}
              />
  
              <Input 
                label="Phone Number" 
                placeholder="+1 202-555-0136" 
                type="number" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isError={!!errors.phone}
                errMsg={errors.phone}
              />
            </div>
          </div>
          <div className="shipping-info">
            <h2>Shipping Info</h2>
            <div className="shipping-container">
              
              <Input 
                label="Address" 
                placeholder="1137 Williams Avenue" 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                isError={!!errors.address}
                errMsg={errors.address}
              />
            
              <Input 
                label="ZIP Code" 
                placeholder="10001" 
                type="number" 
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                isError={!!errors.zip}
                errMsg={errors.zip}
              />
            
              <Input 
                label="City" 
                placeholder="New York" 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                isError={!!errors.city}
                errMsg={errors.city}
              />
           
              <Input 
                label="Country" 
                placeholder="Georgia" 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleChange}
                isError={!!errors.country}
                errMsg={errors.country}
              />
            </div>
          </div>
          <section className="payment-details">
            <h2>Payment Details</h2>
            <section className="payment-details-container">
              <div className="payment-details-inner">
                <label className="payment-details-inner-label">Payment Method</label>
                <div className="radio-inputs-container" >
                  <div onClick={()=>{setPaymentMethod("e-money")}}>
                  <Input
                    name="payment-method"
                    label="e-Money"
                    type="radio"
                    checked={paymentMethod === "e-money"}
                    onChange={() => setPaymentMethod("e-money")}
                  />
                  </div>
                  <div onClick={()=>{setPaymentMethod("cash")}}>
                  <Input
                    name="payment-method"
                    checked={paymentMethod === "cash"}
                    label="Cash on Delivery"
                    type="radio"
                    onChange={() => setPaymentMethod("cash")}
                  />
                  </div>
                </div>
              </div>
              {paymentMethod === "e-money" ? (
                <div className='e-money'>
                  <Input
                    label="e-Money Number"
                    placeholder="324233423"
                    type="number"
                    name="eMoneyNumber"
                    value={formData.eMoneyNumber}
                    onChange={handleChange}
                    isError={!!errors.eMoneyNumber}
                    errMsg={errors.eMoneyNumber}
                  />
                  <Input
                    label="e-Money PIN"
                    placeholder="38673"
                    type="number"
                    name="eMoneyPin"
                    value={formData.eMoneyPin}
                    onChange={handleChange}
                    isError={!!errors.eMoneyPin}
                    errMsg={errors.eMoneyPin}
                  />
                </div>
              ) : null}
            </section>
          </section>
          {paymentMethod === "cash" && (
            <div className="checkout-form-footer">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M42.2812 8.4375H46.5938C47.3704 8.4375 48 9.06713 48 9.84375C48 10.6204 47.3704 11.25 46.5938 11.25H45.0938V23.9062C45.0938 24.6829 44.4641 25.3125 43.6875 25.3125H33.8438V40.9688C33.8438 41.7454 33.2141 42.375 32.4375 42.375H25.0773C24.4239 45.5805 21.5831 48 18.1875 48H1.40625C0.629625 48 0 47.3704 0 46.5938C0 45.8171 0.629625 45.1875 1.40625 45.1875H18.1875C20.021 45.1875 21.585 44.012 22.1653 42.375H8.4375C7.66087 42.375 7.03125 41.7454 7.03125 40.9688C7.03125 40.1921 7.66087 39.5625 8.4375 39.5625H12.5625C13.3379 39.5625 13.9688 38.9317 13.9688 38.1562C13.9688 37.3808 13.3379 36.75 12.5625 36.75H9.43444C6.87619 36.75 4.37297 37.6373 2.38575 39.2485C1.78247 39.7376 0.896906 39.6454 0.407719 39.0419C-0.0814688 38.4385 0.0110625 37.553 0.614344 37.0639C2.84203 35.2578 5.58806 34.1792 8.4375 33.9741V18.375C8.4375 17.5984 9.06713 16.9688 9.84375 16.9688H18.375V7.03125C18.375 6.25462 19.0046 5.625 19.7812 5.625H28.1223C31.9334 2.02078 36.9875 0 42.2641 0H46.5938C47.3704 0 48 0.629625 48 1.40625C48 2.18287 47.3704 2.8125 46.5938 2.8125H42.2642C38.805 2.8125 35.4975 3.79453 32.658 5.625H38.0625C38.8326 5.625 39.4688 6.25228 39.4688 7.03125C39.4688 7.52423 39.3372 7.69561 38.4891 8.80021C38.0648 9.3528 37.4613 10.1389 36.6052 11.3157C36.2039 11.8513 36.3433 12.6075 36.8974 12.9688C37.4088 13.3025 38.0923 13.1781 38.4534 12.6856L41.1473 9.01219C41.4121 8.65088 41.8333 8.4375 42.2812 8.4375ZM32.4375 16.9688C32.9273 16.9688 33.3582 17.2195 33.6099 17.5993C35.4415 15.9118 34.2652 12.7969 31.7344 12.7969C29.5943 12.7969 28.2687 15.1348 29.3533 16.9688H32.4375ZM21.1875 8.4375H35.2472C35.0152 8.75898 34.8251 9.00687 34.6644 9.21646C34.3106 9.67792 34.0992 9.95371 33.896 10.4204C29.6796 8.64131 25.1696 12.4771 26.337 16.9688H21.1875V8.4375ZM22.5938 25.4062V19.7812H19.7812V25.4062H22.5938ZM31.0312 39.5625H16.5403C17.5098 36.8283 15.4711 33.9375 12.5625 33.9375H11.25V19.7812H16.9688V26.8125C16.9688 27.5891 17.5984 28.2188 18.375 28.2188H24C24.7766 28.2188 25.4062 27.5891 25.4062 26.8125V19.7812H31.0312V39.5625ZM33.8438 20.7288V22.5H42.2812V12.2217L40.7213 14.3488C39.9301 15.4278 38.6519 16.0371 37.2972 15.9602C37.1467 18.1043 35.7894 19.9393 33.8438 20.7288Z" fill="#D87D4A"/>
              </svg>
              <span>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </span>
            </div>
          )}
        </div>
        <div className="summary">
          <h2>Summary</h2>
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.id}>
                <div className='product-left'>
                  <div className='product-image'>
                    <img src={`../.${item.image.mobile}`} alt={item.name} />
                  </div>
                  <div className='product-summary-details'>
                    <p>{item.name.split(" ")[0]}</p>
                    <span>$ {item.price}</span>
                  </div>
                </div>
                <div className="product-summary-quantity">
                  <span>x{item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className='checkout-price'>
            <div className="checkout-total">
              <h3>Total</h3>
              <p>${totalPrice}</p>
            </div>
            <div className="checkout-total">
              <h3>SHIPPING</h3>
              <p>$ 50</p>
            </div>
            <div className="checkout-total">
                <h3>VAT (INCLUDED)</h3>
                <p>$ {totalPrice/5}</p>
            </div>
            <div className="checkout-grandtotal">
            <h3>GRAND TOTAL</h3>
            <p>${totalPrice+(totalPrice/5)+50}</p>
            </div>
          </div>
          <button className="continue-button" onClick={handleContinue}>CONTINUE</button>
        </div>
      </div>   
      <Modal 
        show={isModalOpen} 
        handleClose={handleCloseModal} 
        cart={cart} 
        totalPrice={totalPrice}
        grandTotal={totalPrice + (totalPrice/5)+50}
      />
    </div>
  );
};

export default Checkout;
