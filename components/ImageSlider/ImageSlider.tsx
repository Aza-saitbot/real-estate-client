import s from "./ImageSlider.module.scss"
import {useState} from "react";
import EmptyImage from "@/public/assets/empty.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image";

interface IImageSwitcher {
    images: Array<string>
    height: number | string
    width: number | string
}

const ImageSlider = ({images,width,height}: IImageSwitcher) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return <div className={s.imageSwitch}>
            <Image height={300} width={300}  className={s.apartmentImage} src={EmptyImage} alt='not image'/>
        </div>
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const srcImage = process.env.NEXT_PUBLIC_API_URL + images[currentIndex];

    return (
        <div className={s.imageSwitch}>
            {currentIndex > 0 &&
                <div className={s.prev} onClick={handlePrev}><ArrowBackIosNewIcon/></div>
            }
            <img height={height} width={width} className={s.apartmentImage} src={srcImage} alt={`Image ${currentIndex + 1}`}/>
            {currentIndex < images.length - 1 &&
                <div className={s.next} onClick={handleNext}><ArrowForwardIosIcon/></div>
            }
        </div>
    );
};

export default ImageSlider;
