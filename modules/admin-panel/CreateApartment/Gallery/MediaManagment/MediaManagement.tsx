import React, {useEffect, useState} from 'react';
import s from './styles.module.scss';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MediaDraggable from "@/modules/admin-panel/CreateApartment/Gallery/MediaDraggable/MediaDraggable";
import MediaDownload from "@/modules/admin-panel/CreateApartment/Gallery/MediaDownload/MediaDownload";


type DraggableImageListProps = {
    handlerCloseModal: () => void
    images: string[]
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}
const MediaManagement = ({handlerCloseModal,images,setImages}: DraggableImageListProps) => {
    const [modeManagement, setModeManagement] = useState<'list' | 'add'>('list')
    const isModeList = modeManagement === 'list'

    const onHandlerAddMedia = () => {
        setModeManagement('add')
    }

    const onSubmit = () => {
        handlerCloseModal()
    }

    const onHandlerButtonClose = () => {
        if (modeManagement === 'add') {
            setModeManagement('list')
        } else {
            handlerCloseModal()
        }
    }

    const handlerSuccessDownload = () => {
        setModeManagement('list')
    }

    useEffect(()=>{
        if (images.length === 0) {
            setModeManagement('add')
        }
    },[images])

    return (
        <div className={s.mediaManagement}>
            <div className={s.header}>
                <div>
                    {isModeList
                        ? <div className={s.headerButton}>
                            <Button  onClick={onHandlerAddMedia} variant="contained">
                                <AddIcon className={s.addIcon}/>Добавить медиа
                            </Button>
                        </div>
                        : <div className={s.headerTitle}>
                            <h3 >Загрузите файлы</h3>
                        </div>
                    }
                </div>
                <CloseIcon onClick={onHandlerButtonClose} className={s.closeIcon}/>
            </div>
            <div className={s.wrapper}>
                {isModeList
                    ? <MediaDraggable images={images} setImages={setImages}/>
                    : <MediaDownload setImages={setImages} handlerSuccessDownload={handlerSuccessDownload} />
                }
            </div>
            <div className={s.footer}>
                <div>
                    <Button onClick={onSubmit} variant="contained">
                        {isModeList ? 'Сохранить' : 'Добавить'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MediaManagement;