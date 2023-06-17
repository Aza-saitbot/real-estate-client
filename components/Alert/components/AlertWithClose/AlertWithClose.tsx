import React from 'react';
import s from './../../alert.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageTextForAlert, getMessageTitleForAlert, getStylesForAlert } from '../../libs/utils';
import CloseIcon from '../../../../../../public/assets/cross-white.svg';
import { alertWithClosingSelector } from '../../alertSelectors';
import {setAlertWithClosing} from "@/shared/ui/Alert/alertReducer";


const AlertWithClose = () => {
  const { t } = useTranslation();
  const alertWithCustom = useSelector(alertWithClosingSelector);
  const dispatch = useDispatch();

  const onHandlerClosedAlert = () => {
    dispatch(setAlertWithClosing(null));
  };

  if (!alertWithCustom){
    return null
  }
  const title = getMessageTitleForAlert(alertWithCustom,t)
  const text = getMessageTextForAlert(alertWithCustom,t)

  return (
    <div className={s.alertContainer} style={{ background: getStylesForAlert(alertWithCustom) }}>
      {text ? <div className={s.titled}><h4>{title}</h4><p>{text}</p></div> : <p>{text}</p>}
      <div className={s.closeIcon} onClick={onHandlerClosedAlert}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default AlertWithClose;
