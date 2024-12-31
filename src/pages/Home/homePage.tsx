import DefaultButton1 from '../../components/Buttons/defaultButton1';
import Image from '../../assets/home/desktop/image-hero.jpg';
import './homePage.css';
import ProductPreview from '../../components/Product_Preview/product_preview';
import TabletImage from '../../assets/home/tablet/image-header.jpg';
import MobileImage from '../../assets/home/mobile/image-header.jpg';
import Zx9speaker from '../../components/Product_Preview/homePage_zx9speaker';
import Zx7speaker from '../../components/Product_Preview/homePage_zx7speaker';
import Yx1earphones from '../../components/Product_Preview/homePage_yx1earphones';
import Advertisement from '../../components/Product_Preview/homePage_advertisement';
import { useLayoutContext } from '../../Layouts/layout';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    
    const { isMenuOpen } = useLayoutContext();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/products/headphones/4');
    };

    return (
        <main>
            <div className='frame' id={isMenuOpen ? 'frame-passive' : ''}>
                <div className='responsive-frame'>
                    <img src={TabletImage} alt="headphoneimage" className='tablet_image'></img>
                    <img src={MobileImage} alt="headphoneimage" className='mobile_image'></img>
                    <div className='text-content'>
                        <h3>NEW PRODUCT</h3>
                        <h1>XX99 Mark II HeadphoneS</h1>
                        <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                        <DefaultButton1 onClick={handleClick} />
                        </div>
                </div>
                <div className='product-frame'>
                    <div className='product-container'>
                        <h3>NEW PRODUCT</h3>
                        <h1>XX99 Mark II HeadphoneS</h1>
                        <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                        <DefaultButton1 onClick={handleClick} />
                    </div>
                    <div className='product-picture-container'>
                        <img src={Image} alt="Product" />
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className='popup-menu'>
                    <ProductPreview />
                </div>
            )}
            <div className='product-content' id={isMenuOpen ? 'product-content-passive' : ''}>
                <ProductPreview />
                <Zx9speaker />
                <Zx7speaker />
                <Yx1earphones />
                <Advertisement />
            </div>
        </main>
    );
};

export default HomePage;
