import React, {useEffect, useState} from 'react';
import s from './styles.module.scss';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {useFormContext} from "react-hook-form";
import MediaDraggable from "@/modules/admin-panel/CreateApartment/Gallery/MediaDraggable/MediaDraggable";
import MediaDragAndDrop from "@/modules/admin-panel/CreateApartment/Gallery/MediaDragAndDrop/MediaDragAndDrop";

type DraggableImageListProps = {
    handlerCloseModal: () => void
}
const MediaManagement = ({handlerCloseModal}: DraggableImageListProps) => {
    const {getValues} = useFormContext()
    const images: Array<string> = getValues().images
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
                    ? <MediaDraggable onHandlerAddMedia={onHandlerAddMedia} handlerCloseModal={handlerCloseModal}
                                          images={images}/>
                    : <MediaDragAndDrop handlerSuccessDownload={handlerSuccessDownload} />
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