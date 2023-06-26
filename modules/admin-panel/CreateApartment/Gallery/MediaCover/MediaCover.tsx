import React from 'react';
import s from './MediaCover.module.scss';
import {Button} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useFormContext} from "react-hook-form";
import {ButtonWrapper} from "@/components/ButtonWrapper/ButtonWrapper";

const VISIBLE_IMAGES = 6

type MediaCoverProps = {
    handlerCloseModal:()=> void
}
const MediaCover = ({handlerCloseModal}:MediaCoverProps) => {
    const {getValues,setValue} = useFormContext()
    const images= getValues().images
    const isRemainingImages = images.length > VISIBLE_IMAGES
    const remainingImages = isRemainingImages ? images.length - VISIBLE_IMAGES : 0

    const clearImages = () => {
        setValue('images',[])
    }


    return (
        <>
            <div className={s.list}>
                {images.map(image =>
                    <div key={image}>
                        <img width={200} height={120}
                             src={process.env.NEXT_PUBLIC_API_URL + image}
                             alt={`Image ${image}`}
                        />
                    </div>
                )}
                {isRemainingImages && <div className={s.remainingImages}><h3>+{remainingImages}</h3></div>}
            </div>
            <div className={s.actions}>
                <div className={s.buttons}>
                    <Button onClick={handlerCloseModal}  variant='outlined'><CachedIcon/> <span>Управлять медиа</span></Button>
                    <ButtonWrapper titleTooltip='Превью' onClick={handlerCloseModal} >
                        <OpenInFullIcon/>
                    </ButtonWrapper>
                    <ButtonWrapper titleTooltip='Очистить' onClick={clearImages}>
                        <DeleteOutlineIcon/>
                    </ButtonWrapper>
                </div>
            </div>
        </>
    );
};

export default MediaCover;