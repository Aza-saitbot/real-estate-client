import React, {useState} from 'react';
import s from './Gallery.module.scss';
import {useFormContext} from "react-hook-form";
import {CreateApartmentFormType} from "@/modules/admin-panel/CreateApartment/CreateApartment";
import MediaPlug from "@/modules/admin-panel/CreateApartment/Gallery/MediaPlug/MediaPlug";
import MediaCover from "@/modules/admin-panel/CreateApartment/Gallery/MediaCover/MediaCover";
import ModalStyled from "@/components/ModalStyled/ModalStyled";
import MediaManagement from "@/modules/admin-panel/CreateApartment/Gallery/MediaManagment/MediaManagement";

const Gallery = () => {
    const {getValues} = useFormContext<CreateApartmentFormType>()
    const images = getValues().images
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