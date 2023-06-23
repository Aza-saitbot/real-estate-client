import React, {useState} from 'react';
import s from './Gallery.module.scss';
import {useFormContext} from "react-hook-form";

const Gallery = () => {
    const {getValues} = useFormContext()
    const images: Array<string> = getValues('images')
    const [open, setOpen] = React.useState(false);

    const handlerCloseModal = () => setOpen(false);

    const handlerOpenModal = () => {
      setOpen(true)
    }

    return (
        <div className={s.gallery}>
            {images.length === 0
            ? <MediaPlug handlerOpenModal={handlerOpenModal}/>
            : <MediaCover handlerCloseModal={handlerOpenModal} />
            }
            <ModalStyled onChangeStateOpen={handlerCloseModal} open={open}>
                <MediaManagement handlerCloseModal={handlerCloseModal}/>
            </ModalStyled>
        </div>
    );
};

export default Gallery;