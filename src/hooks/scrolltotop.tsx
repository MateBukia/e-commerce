import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('Scrolling to top for path:', pathname); 
        document.querySelector("body")?.scrollTo({top: 0,  behavior:'smooth'})
    }, [pathname]);
};

export default useScrollToTop;
