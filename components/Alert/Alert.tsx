import React, {useEffect} from 'react';
import s from './alert.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {alertsSelector} from './alertSelectors';
import {removeAlert} from './alertReducer';
import {useTranslation} from "next-i18next";
import {getMessageTextForAlert, getStylesForAlert} from "@/shared/ui/Alert/libs/utils";
import AlertWithClose from "@/shared/ui/Alert/components/AlertWithClose/AlertWithClose";
import AlertTextWithLink from "@/shared/ui/Alert/components/AlertTextWithLink/AlertTextWithLink";


const Alert = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const alerts = useSelector(alertsSelector);

    useEffect(() => {
        if (alerts.length > 0) {
            setTimeout(() => {
                dispatch(removeAlert(alerts[alerts.length - 1]));
            }, 3000);
        }
    }, [alerts]);

    return (
        <div className={s.alertContainer}>
            {alerts.map((alert) => (
                <div  className={[s.alert, getStylesForAlert(alert)].join(' ')}
                      key={alert.identificator} style={{ background: getStylesForAlert(alert) }}
                     >
                    <p>{getMessageTextForAlert(alert,t)}</p>
                </div>
            ))}
            <AlertWithClose />
            <AlertTextWithLink />
        </div>
    );
};

export default Alert;
