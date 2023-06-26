import s from "./ApartmentCard.module.scss"
import {IApartment} from "@/modules/types";
import ImageSlider from "@/modules/apartments/ImageSlider/ImageSlider";

const ApartmentCard = ({title,price,images,address}:IApartment) => {
    return (
        <div className={s.card}>
            <ImageSlider images={images}/>
            <div>
                title: {title}
            </div>
            <div>
                Стоимость: {price}
            </div>
            <div>
                Адрес: {address}
            </div>
        </div>
    );
};

export default ApartmentCard;