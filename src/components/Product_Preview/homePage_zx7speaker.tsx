import './homePage_zx7speaker.css'
import zx7speakerimage from '../../assets/home/desktop/image-speaker-zx7.jpg'
import DefaultButton2 from '../Buttons/defaultButton2'
import zx7seakertablet from '../../assets/home/tablet/image-speaker-zx7.jpg'
import zx7speakermobile from '../../assets/home/mobile/image-speaker-zx7.jpg'
import { Link } from 'react-router-dom'

const Zx7speaker = () =>{
    return(
        <div className="zx7-speaker">
            <img src={zx7speakerimage} alt="speaker-image" className='zx7speakerimage'></img>
            <img src={zx7seakertablet} alt='sepeaker-image' className='zx7speakertablet'></img>
            <img src={zx7speakermobile} alt='sepeaker-image' className='zx7speakermobile'></img>
            <div className='title'>
                    <h1>ZX7 SPEAKER</h1>
                    <Link to="/products/speakers/5">
                    <DefaultButton2 />
                    </Link>
                </div>
        </div>
    )
} 
export default Zx7speaker;