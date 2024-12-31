import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productdetail.css';
import data from '../../data/data.json';
import { ProductData } from '../../Interfaces/types';
import DefaultButton1 from '../../components/Buttons/defaultButton1';
import { useCart } from '../../Context/CartContext';
import ProductPreview from '../../components/Product_Preview/product_preview';
import Advertisement from '../../components/Product_Preview/homePage_advertisement';
import { useLayoutContext } from '../../Layouts/layout';

const productData: ProductData = data;

const ProductDetail = () => { 

  const [notification, setNotification] = useState('');
  const [productcount, setproductcount] = useState(0);

  const [quantity, setQuantity] = useState<number>(1);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { isMenuOpen } = useLayoutContext();

  const product = productData.find(product => product.id.toString() === productId);

  useEffect(() => {
    if (!product) {
      navigate('/not-found', { replace: true });
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleButtonClick = (slug: string) => {
    const otherProduct = productData.find(p => p.slug === slug);
    if (otherProduct) {
      navigate(`/products/${otherProduct.category}/${otherProduct.id}`);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity: number) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity: number) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({ id: product.id, image: product.image, name: product.name, price: product.price, quantity,productcount:quantity});
    console.log(`Added ${quantity} items to the cart.`);
    setproductcount(productcount + quantity);
    setNotification('Item added to the cart');
    setTimeout(() => {
        setNotification('');
    }, 3000); 
  };

  return (
    <main>
      <div className="product-category">
        <h4 onClick={handleGoBack}>Go Back</h4>
        {isMenuOpen && (
                <div className='popup-menu'>
                    <ProductPreview />
                </div>
            )}
        <div className="product-category-detail">
          <img src={`../.${product.categoryImage.desktop}`} alt={product.name} />
          <div className="description">
            {product.new && <pre>NEW PRODUCT</pre>}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <div className="add-to-cart">
              <div className="quantity-selector">
                <button onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              {notification && <div className="notification">{notification}</div>}
            </div>
          </div>
        </div>
        <div className="product-features">
          <div className='features-description'>
            <h1>FEATURES</h1>
            <h4>{product.features}</h4>
          </div>
          <div className="in-the-box">
            <h1>IN THE BOX</h1>
            <div className="includes">
              {product.includes.map((include, index) => (
                <div key={index} className='includes-detail'>
                  <p>{include.quantity}x</p>
                  <span>{include.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product-gallery">
          <div className="product-gallery-left">
            <img src={`../.${product.gallery.first.desktop}`} alt="" />
            <img src={`../.${product.gallery.second.desktop}`} alt="" />
          </div>
          <div className="product-gallery-right">
            <img src={`../.${product.gallery.third.desktop}`} alt="" />
          </div>
        </div>
        <div className="other-products">
          <h1>You may also like</h1>
          <div className="other-products-container">
            <div className="other-three-products">
              {product.others.map((otherProduct, index) => (
                <div key={index} className="product-item">
                  <picture>
                    <source srcSet={`../.${otherProduct.image.desktop}`} media="(min-width: 1024px)" />
                    <source srcSet={`../.${otherProduct.image.tablet}`} media="(min-width: 768px)" />
                    <img src={`../.${otherProduct.image.mobile}`} alt={otherProduct.name} />
                  </picture>
                  <h4>{otherProduct.name}</h4>
                  <DefaultButton1 onClick={() => handleButtonClick(otherProduct.slug)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ProductPreview />
        <Advertisement />
      </div>
    </main>
  );
};

export default ProductDetail;
