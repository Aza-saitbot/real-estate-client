import React, {useContext} from "react";
import s from "./Header.module.scss";
import {useRouter} from "next/router";
import * as Api from "@/api";
import {useTranslation} from "next-i18next";
import {LayoutContext} from "@/layout/Layout";


export const Header = () => {
    const router = useRouter()
    const {t, i18n} = useTranslation()
    const {user, setUser} = useContext(LayoutContext);
console.log('HEADERRRR user ',user)
    const onHandlerExit = () => {
        Api.auth.logout()
        setUser(null)
    }

    /* await router.push('/admin-panel','/admin-panel',{locale})*/

    const onLogin =  async () => {
        await router.push('/auth', '/auth', {locale: i18n.language})
    }

    const onHome = async () => {
        await router.push('/', '/', {locale: i18n.language})
    }

    return (
        <div className={s.header}>
            <div>
                <button onClick={onHome}>Home</button>
            </div>
            <div>
                {user && <div>{user?.fullName}</div>}
                {user
                    ? <button onClick={onHandlerExit}>Выйти</button>
                    : <button onClick={onLogin}>Войти</button>
                }
            </div>
        </div>
    );
};
