import React, { useEffect } from 'react';
import './productCategory_page.css';
import data from '../../data/data.json';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductData } from '../../Interfaces/types';
import DefaultButton1 from '../../components/Buttons/defaultButton1';
import ProductPreview from '../../components/Product_Preview/product_preview';
import Advertisement from '../../components/Product_Preview/homePage_advertisement';
import { useLayoutContext } from '../../Layouts/layout';

const productData: ProductData = data;

const ProductPage = () => {
  const { productName } = useParams<{ productName: string }>();
  const navigate = useNavigate();

  const filteredProducts = productData?.filter(product => product.category === productName);
  const newProduct = filteredProducts.find(product => product.new);
  const otherProducts = filteredProducts?.filter(product => product !== newProduct);

  const { isMenuOpen } = useLayoutContext();

  useEffect(() => {
    if (!filteredProducts.length) {
      navigate('/not-found', { replace: true });
    }
  }, [filteredProducts, navigate]);

  const handleButtonClick = (productId: number, productcategory: string) => {
    navigate(`/products/${productcategory}/${productId}`);
  };

  const renderProduct = (product: Product, index: number) => (
    <div className='product' key={product.id}>
      {index % 2 === 0 ? (
        <>
          <img src={`../.${product.image.desktop}`} alt={product.name} />
          <div className='description'>
            {product.new && <span>NEW PRODUCT</span>}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <DefaultButton1 onClick={() => handleButtonClick(product.id, product.category)} />
          </div>
        </>
      ) : (
        <>
          <div className='description'>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <DefaultButton1 onClick={() => handleButtonClick(product.id, product.category)} />
          </div>
          <img src={`../.${product.image.desktop}`} alt={product.name} />
        </>
      )}
    </div>
  );

  return (
    <main>
      <div className='product-name'>
        <h1>{productName}</h1>
      </div>
      {isMenuOpen && (
                <div className='popup-menu'>
                    <ProductPreview />
                </div>
            )}
      {newProduct && renderProduct(newProduct, 0)}
      {otherProducts.map((product, index) => renderProduct(product, index + 1))}
      <ProductPreview />
      <Advertisement />
    </main>
  );
};

export default ProductPage;
