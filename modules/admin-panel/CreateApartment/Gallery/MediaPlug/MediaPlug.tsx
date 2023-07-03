import React from 'react';
import s from './MediaPlug.module.scss';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {GalleryModeType} from "@/modules/admin-panel/CreateApartment/Gallery/Gallery";


type ButtonWrapperProps = {
    setModeGallery: (mode: GalleryModeType) => void
}
const MediaPlug = ({setModeGallery}:ButtonWrapperProps) => {
    const openModalMedia = () => {
      setModeGallery('media')
    }
    return (
            <div onClick={openModalMedia}  className={s.emptyWrapper}>
                <div className={s.empty}>
                    <div className={s.emptyText}>
                        <Button  variant="text">
                            <AddIcon className={s.addIcon}/>Добавить медиа
                        </Button>
                        <div>Выберите изображение для добавления</div>
                    </div>
                </div>
            </div>
    );
};

export default MediaPlug;