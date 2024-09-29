import './homePage_yx1earphones.css'
import yx1earphoneimage from '../../assets/home/desktop/image-earphones-yx1.jpg'
import DefaultButton2 from '../Buttons/defaultButton2'
import yx1earphonestablet from '../../assets/home/tablet/image-earphones-yx1.jpg'
import yx1earphonesmobile from '../../assets/home/mobile/image-earphones-yx1.jpg'
import { Link } from 'react-router-dom'

const Yx1earphones = () =>{
    return(
    <div className="yx1_earphones">
        <div className="earphones-picture">
            <img src={yx1earphoneimage} alt="earphones-image" className='yx1earphoneimage'></img>
            <img src={yx1earphonestablet} alt="earphones-image" className='yx1earphonestablet'></img>
            <img src={yx1earphonesmobile} alt="earphones-image" className='yx1earphonesmobile'></img>
        </div>
        <div className="description">
            <h1>YX1 EARPHONES</h1>
            <Link to="/products/earphones/1">
            <DefaultButton2 />
            </Link>
        </div>
    </div>
    )
}
export default Yx1earphones;