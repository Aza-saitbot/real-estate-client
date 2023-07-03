import React, {useState} from 'react';
import s from './Gallery.module.scss';
import {useFormContext} from "react-hook-form";
import {CreateApartmentFormType} from "@/modules/admin-panel/CreateApartment/CreateApartment";
import MediaPlug from "@/modules/admin-panel/CreateApartment/Gallery/MediaPlug/MediaPlug";
import MediaCover from "@/modules/admin-panel/CreateApartment/Gallery/MediaCover/MediaCover";
import ModalStyled from "@/components/ModalStyled/ModalStyled";
import MediaManagement from "@/modules/admin-panel/CreateApartment/Gallery/MediaManagment/MediaManagement";
import MediaPreview from "@/modules/admin-panel/CreateApartment/Gallery/MediaPreview/MediaPreview";

export type GalleryModeType = 'media' | 'preview' | null

const Gallery = () => {
    const {getValues,setValue} = useFormContext<CreateApartmentFormType>()
    const [images,setImages]=useState<Array<string>>(getValues().images)
    const [mode, setMode] = useState<GalleryModeType>(null)

    const handlerCloseModal = () => setMode(null);

    const setModeGallery = (mode: GalleryModeType) => {
        setMode(mode)
    }

    const clearImages = () => {
        setImages([])
        setValue('images',[] )
    }

    return (
        <div className={s.content}>
            <h3>Gallery</h3>
            <div className={s.gallery}>
                {images.length === 0
                    ? <MediaPlug setModeGallery={setModeGallery}/>
                    : <MediaCover setModeGallery={setModeGallery} images={images} clearImages={clearImages}/>
                }
                <ModalStyled onChangeStateOpen={handlerCloseModal} open={!!mode}>
                    {mode && mode === 'media'
                        ? <MediaManagement setImages={setImages} images={images} handlerCloseModal={handlerCloseModal}/>
                        : <MediaPreview images={images} setModeManagement={setModeGallery}/>
                    }
                </ModalStyled>
            </div>
        </div>

    );
};

export default Gallery;