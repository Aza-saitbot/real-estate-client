import React, {useState} from 'react';
import s from './MediaDragAndDrop.module.scss';
import {useFormContext} from "react-hook-form";
import {useAppDispatch} from "@/redux/store";


type DragBarProps = {
    handlerSuccessDownload: () => void
}
const MediaDragAndDrop = ({handlerSuccessDownload}:DragBarProps) => {
    const {setValue} = useFormContext()
    const dispatch = useAppDispatch()
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
        const res = await dispatch(uploadImages(files))
        if (res.meta.requestStatus === 'fulfilled' && res.payload && typeof res.payload !== 'number')  {
            console.log('res.payload',res.payload)
            setValue('images', res.payload)
            handlerSuccessDownload()
        }
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