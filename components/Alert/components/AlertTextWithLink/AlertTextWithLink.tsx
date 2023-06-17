import React from 'react';
import s from './../../alert.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getStylesForAlert } from '../../libs/utils';
import Link from "next/link";
import {alertTextWithLinkSelector} from "@/shared/ui/Alert/alertSelectors";
import {setAlertTextWithLink} from "@/shared/ui/Alert/alertReducer";
import CloseIcon from '../../../../../../public/assets/cross-white.svg';


const AlertTextWithLink = () =>{
  const textWithLink = useSelector(alertTextWithLinkSelector);
  const dispatch = useDispatch()
  if (!textWithLink){
    return null
  }
  const { payload:{ text,linkKeyword,linkPath }  } = textWithLink
  // разделяем text на части
  const parts = text.split(linkKeyword);

  const handleLinkClick = () => {
    dispatch(setAlertTextWithLink(null));
  };

  const closedAlertTextWithLink = () => {
    dispatch(setAlertTextWithLink(null))
  };

  // проходим по каждой части текста и отображаем ее, добавляя ссылку только перед последней частью
  const alertContent = parts.map((part, index) => (
      <React.Fragment key={`${part}`}>
        {part}
        {index !== parts.length - 1 && (
            <Link href={linkPath} onClick={handleLinkClick}>
              {linkKeyword}
            </Link>
        )}
      </React.Fragment>
  ))

  return (
    <div className={s.alertContainer} style={{ background: getStylesForAlert(textWithLink) }}>
      <div className={s.titled}>
        {alertContent}
        <div className={s.closeIcon} onClick={closedAlertTextWithLink}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default AlertTextWithLink;
