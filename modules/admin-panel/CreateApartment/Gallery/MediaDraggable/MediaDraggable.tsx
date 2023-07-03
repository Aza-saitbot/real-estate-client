import React, {useState} from 'react';
import s from './MediaDraggable.module.scss';
import {Tooltip} from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useRouter} from "next/router";

type MediaDraggableProps = {
    images: Array<string>
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}
const MediaDraggable = ({images, setImages}: MediaDraggableProps) => {
    const [imageList, setImageList] = useState<Array<string>>(images);
    const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
    const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData('imageIndex', index.toString());
        setDraggedImageIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        if (draggedImageIndex !== null && draggedImageIndex !== index) {
            const updatedImageList = [...imageList];
            const draggedImage = updatedImageList[draggedImageIndex];
            updatedImageList.splice(draggedImageIndex, 1);
            updatedImageList.splice(index, 0, draggedImage);
            setImageList(updatedImageList);
            setImages(updatedImageList);
            setDraggedImageIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDraggedImageIndex(null);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredImageIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredImageIndex(null);
    };

    const handleDeleteImage = (index: number) => {
        const updatedImageList = [...imageList];
        updatedImageList.splice(index, 1);
        setImageList(updatedImageList);
    };

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                {imageList.map((image, index) => (
                    <div
                        key={image}
                        draggable
                        onDragStart={(event) => handleDragStart(event, index)}
                        onDragOver={(event) => handleDragOver(event, index)}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            opacity: draggedImageIndex === index ? 0.5 : 1,
                            transform: `translateY(${draggedImageIndex === index ? 0 : 0}px)`,
                            transition: 'transform 0.3s ease-in-out',
                            position: 'relative',
                        }}
                    >
                        <>
                            <div className={s.number}>{index + 1}</div>
                            <img className={s.image} src={process.env.NEXT_PUBLIC_API_URL + image}
                                 alt={`Image ${image}`}/>
                        </>
                        {hoveredImageIndex === index && (
                            <div className={s.hover}>
                                <OpenWithIcon className={s.moveIcon}/>
                                <div className={s.buttonDelete}>
                                    <Tooltip placement='top' title='Удалить'>
                                        <DeleteOutlineIcon
                                            onClick={() => handleDeleteImage(index)}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaDraggable;