import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import './Cartbox.css';



const Cart = () => {
  const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalProductCount = cart.reduce((total, item) => total + item.productcount, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, totalPrice } });
  };

  return (
    <div className="cart">
      <div className='cart-header'>
        <h2>Cart ({totalProductCount})</h2>
        {cart.length !== 0 ? (
          <h4 onClick={clearCart}>Remove all</h4>
        ) : null}
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <div className='product-image'>
                  <img src={`../.${item.image.mobile}`} alt={item.name} />
                </div>
                <div className='product-name-price'>
                  <h4>{item.name.split(" ")[0]}</h4>
                  <span>${item.price}</span>
                </div>
                <div className='product-quantity'>
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
                <button id="remove"onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h4>Total</h4>
            <h5>${totalPrice}</h5>
          </div>
          <div className='continue-checkout' onClick={handleCheckout}>
            <button>CHECKOUT</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
