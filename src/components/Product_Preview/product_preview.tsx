import './product_preview.css'
import ImageHeadphones from '../../assets/shared/desktop/image-category-thumbnail-headphones.png'
import ImageSpeakers from '../../assets/shared/desktop/image-category-thumbnail-speakers.png'
import ImageEarphones from '../../assets/shared/desktop/image-category-thumbnail-earphones.png'
import ArrowImage from '../../assets/shared/desktop/arrow.png'
const products = [
  {
    image: ImageHeadphones,
    title: "HEADPHONES",
    link: `${import.meta.env.BASE_URL}products/headphones`
  },
  {
    image: ImageSpeakers,
    title: "SPEAKERS",
    link: `${import.meta.env.BASE_URL}products/speakers`
  },
  {
    image: ImageEarphones,
    title: "EARPHONES",
    link: `${import.meta.env.BASE_URL}products/earphones`
  }
];

const ProductPreview = () => {
  return (
    <div className="product-list">
      {products.map((item, index) => (
        <div key={index} className="product-item">
            <div className="image-wrapper">
                <img src={item.image} alt={item.title} className="product-image" />
            </div>
            <h3>{item.title}</h3>
            <a href={item.link} className="shop-link">
                 SHOP 
                <span className="arrow">
                  <img src={ArrowImage} alt="arrowimage" />
                </span>
            </a>
        </div>
      ))}
    </div>
  );
};

export default ProductPreview;
