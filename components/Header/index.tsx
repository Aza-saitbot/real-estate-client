import React from "react";
import s from "./Header.module.scss";
import {useRouter} from "next/router";
import * as Api from "@/api";
import {useTranslation} from "next-i18next";
import {Button} from "@mui/material";
import {IUser} from "@/api/dto/auth.dto";


type HeaderProps = {
    user?: IUser
}
export const Header = ({user}:HeaderProps) => {
    const router = useRouter()
    const {t, i18n} = useTranslation()

    const onHandlerExit = () => {
        Api.auth.logout()
        router.push('/auth', '/auth', {locale: i18n.language})
    }

    const onLogin = () => router.push('/auth', '/auth', {locale: i18n.language})

    const onHome = () => router.push('/', '/', {locale: i18n.language})

    return (
        <div className={s.header}>
            <div>
                <Button variant='contained' onClick={onHome}><h1>LOGO REAL ESTATE</h1></Button>
            </div>

            <div className={s.user}>
                <div>{user?.fullName}</div>
                {user
                    ? <Button variant='outlined' onClick={onHandlerExit}>Выйти</Button>
                    : <Button variant='outlined' onClick={onLogin}>Войти</Button>
                }
            </div>
        </div>
    );
};
