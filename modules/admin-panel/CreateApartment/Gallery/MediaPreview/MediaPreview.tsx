import React from 'react';
import s from './MediaPreview.module.scss';
import {Button} from "@mui/material";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import CloseIcon from "@mui/icons-material/Close";
import CachedIcon from "@mui/icons-material/Cached";
import {GalleryModeType} from "@/modules/admin-panel/CreateApartment/Gallery/Gallery";

type MediaDraggableProps = {
    images: Array<string>
    setModeManagement: (mode: GalleryModeType) => void
}
const MediaPreview = ({images, setModeManagement}: MediaDraggableProps) => {
    const onHandlerModeManagement = () => {
        setModeManagement('media')
    }
    const closeModal = () => {
        setModeManagement(null)
    }
    return (
        <div className={s.content}>
            <div className={s.header}>
                <Button onClick={onHandlerModeManagement} variant='outlined'>
                    <CachedIcon/><span>Управлять медиа</span>
                </Button>
                <CloseIcon onClick={closeModal} className={s.closeIcon}/>
            </div>
            <ImageSlider images={images} height='100%' width='100%'/>
        </div>
    );
};

export default MediaPreview;