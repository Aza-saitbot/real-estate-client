import React, {useContext, useEffect, useState} from 'react';
import s from './alert.module.scss';
import {useTranslation} from "next-i18next";
import {LayoutContext} from "@/layout/Layout";



export type AlertType = {
    code?: number;
    identificator: string | number;
    payload?: string;
    color?: 'success' | 'error'
};

const Alert = () => {
    const {t} = useTranslation();
    const alertData = useContext(LayoutContext);
    const [alerts, setAlerts] = useState<Array<AlertType>>([])

    const removeAlert = () => {
        const alertIndex = alerts.findIndex(a => a.identificator === alerts[alerts.length - 1].identificator);
        if (alertIndex !== -1) {
            setAlerts(alerts.splice(alertIndex, 1))
        }
    }

    useEffect(()=>{
        if(alertData){
            setAlerts([...alerts, alertData])
        }
    },[alertData])

    useEffect(() => {
        if (alerts.length > 0) {
            setTimeout(() => {
                removeAlert()
            }, 3000);
        }
    }, [alerts]);

    return (
        <div className={s.alertContainer}>
            {alerts.map((alert) =>
                <div className={`${s.alert} ${alert.code ? 'error' : alert.color}`} key={alert.identificator}>
                    <p>{alert.code ? t(`errors.${alert.code}`) : alert.payload}</p>
                </div>
            )}
        </div>
    );
};

export default Alert;
