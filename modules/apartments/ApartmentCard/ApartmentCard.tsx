import s from "./ApartmentCard.module.scss"
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import {IApartment} from "@/api/dto/apartments.dto";

const ApartmentCard = ({title,price,images,address}:IApartment) => {
    return (
        <div className={s.card}>
            <ImageSlider images={images} height={300} width={300}/>
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