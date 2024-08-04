// src/hooks/useDeviceDetect.js
import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let isMobile = /Mobi/i.test(window.navigator.userAgent);

        setIsMobile(isMobile);
        console.log(isMobile);
    }, []);

    return { isMobile };
};

export default useDeviceDetect;
