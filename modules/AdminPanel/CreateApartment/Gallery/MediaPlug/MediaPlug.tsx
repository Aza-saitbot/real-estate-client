import React from 'react';
import s from './MediaPlug.module.scss';
import Image from "next/image";
import EmptyImage from "../../../../../public/assets/empty.png";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


type ButtonWrapperProps = {
    handlerOpenModal: () => void
}
const MediaPlug = ({handlerOpenModal}:ButtonWrapperProps) => {
    return (
            <div onClick={handlerOpenModal}  className={s.emptyWrapper}>
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