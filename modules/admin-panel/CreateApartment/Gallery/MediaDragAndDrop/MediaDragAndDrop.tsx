import React, {useState} from 'react';
import s from './MediaDragAndDrop.module.scss';
import {useFormContext} from "react-hook-form";
import {uploadImages} from "@/api/apartments";


type DragBarProps = {
    handlerSuccessDownload: () => void
}
const MediaDragAndDrop = ({handlerSuccessDownload}: DragBarProps) => {
    const {setValue} = useFormContext()
    const [drag, setDrag] = useState(false)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    };

    const fetchDownloadImages = async (files: FileList) => {
        try {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }
            const images = await uploadImages(formData)
            setValue('images', images)
            handlerSuccessDownload()
        } catch (e) {}

    }

    const onDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        // @ts-ignore
        let files = [...e.dataTransfer.files] as FileList
        await fetchDownloadImages(files)
        setDrag(false)
    };
    const onChangeInputDownloader = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget?.files) {
            await fetchDownloadImages(event.currentTarget.files)
        }
    }

    return (
        <div className={s.dragBar}>
            <div className={s.item}>
                <div className={s.dropzone}>
                    {drag
                        ? <div
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            onDrop={e => onDropHandler(e)}
                            className={s.area}>
                            <h4>Отпустите файлы, что бы их загрузить</h4>
                        </div>
                        : <div
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            className={s.area}
                        >
                            <div className={s.blockText}>
                                <h4>Перетащите файлы, чтобы загрузить их</h4>
                                <div>или</div>
                                <label htmlFor="buttonDownload" className={s.buttonDownload}>Выберите файлы</label>
                                <input onChange={onChangeInputDownloader} id="buttonDownload"
                                       className={s.my} type='file' multiple={true}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaDragAndDrop;