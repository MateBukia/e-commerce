import './homePage_zx9speaker.css'
import zx9speakerimage from '../../assets/home/desktop/image-speaker-zx9.png'
import DefaultButton2 from '../Buttons/defaultButton2'
import { Link } from 'react-router-dom'
const Zx9speaker = () =>{
    return(
        <div className='zx9speaker-container'>
            <div className='oval'>
            <svg viewBox="0 0 944 944" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#FFF" fill="none" fill-rule="evenodd" opacity=".202">
                        <circle cx="472" cy="472" r="235.5"/>
                        <circle cx="472" cy="472" r="270.5"/>
                        <circle cx="472" cy="472" r="471.5"/>
                    </g>
             </svg>            </div>
            <div className='zx9speaker-description'>
                    <img src={zx9speakerimage} alt="speaker image" className='speaker-image'></img>
                    <div className='text'>
                            <h1>ZX9 SPEAKER</h1>
                            <h3>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</h3>
                            <Link to="/products/speakers/6">
                            <DefaultButton2 />
                            </Link>
                    </div>
            </div>
        </div>
    )
}
export default Zx9speaker;