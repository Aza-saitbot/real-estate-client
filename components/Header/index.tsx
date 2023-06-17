import React from "react";
import s from "./Header.module.scss";

import { useRouter } from "next/router";

import * as Api from "@/api";
import {useTranslation} from "next-i18next";
import {useAppSelector} from "@/store/store";

export const Header: React.FC = () => {
  const router = useRouter()
  const {asPath,locale} = router
  const { t,i18n } = useTranslation()
  const user = useAppSelector(state => state.user.user)

  const onHandlerExit = async () => {
    await router.push('/apartments','/apartments',{locale})
  }

  const onLogin = async () => {
    await router.push('/auth','/auth',{locale})
    api.auth.logout()
  }
  const onHome = async () => {
    await router.push('/','/',{locale})
  }

  return (
    <Header className={s.header}>
        <div>
          <button onClick={onHome}>Home</button>
        </div>
        <div >
          <div>
            {user?.fullName}
          </div>
          {user && <button onClick={onLogin}>Выйти</button>}
          {!user && <button onClick={onHandlerExit}>Войти</button>}
        </div>
    </Header>
  );
};
