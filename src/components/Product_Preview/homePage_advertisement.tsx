import './homePage_advertisement.css'
import advertisemenimage from '../../assets/shared/desktop/image-best-gear.jpg'
import advertisementimagetablet from '../../assets/shared/tablet/image-best-gear.jpg'
import advertisementimagemobile from '../../assets/shared/mobile/image-best-gear.jpg'

const Advertisement = () =>{
    return(
<div className="advertisement">
    <div className="description">
        <h1>Bringing you the <span>best</span> audio gear</h1>
        <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
    </div>
    <div className="image">
        <img src={advertisemenimage} alt="image" className='advertisemenimage'></img>
        <img src={advertisementimagetablet} alt="image" className='advertisementimagetablet'></img>
        <img src={advertisementimagemobile} alt="image" className='advertisementimagemobile'></img>
    </div>
</div>
    )
}
export default Advertisement;