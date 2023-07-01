import {GetServerSidePropsContext, NextPage} from "next";
import s from "@/styles/Auth.module.scss"
import {useTranslation} from "next-i18next";;
import {checkAuth} from "@/utils/checkAuth";
import {useContext} from "react";
import {Layout, LayoutContext} from "@/layout/Layout";
import * as React from "react";
import {LoginForm} from "@/modules/auth-forms/LoginForm";
import {RegisterForm} from "@/modules/auth-forms/RegisterForm";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel} from "@mui/base";
import {Box} from "@mui/material";
import AuthTabs from "@/modules/auth-forms/AuthTabs";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AuthPage: NextPage = () => {

    return (
        <Layout title='Страница - Авторизации'>
            <div className={s.login}>
              <AuthTabs/>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async (ctx) => {
    return {props: {}};
}

export default AuthPage;
