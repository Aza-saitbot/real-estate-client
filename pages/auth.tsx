import {NextPage} from "next";
import s from "@/styles/Auth.module.scss"
import * as React from "react";
import {Layout} from "@/layout/Layout";
import AuthTabs from "@/modules/auth-tabs/AuthTabs";

const AuthPage: NextPage = () => {
    return (
        <Layout title='Страница - Авторизации'>
            <div className={s.login}>
              <AuthTabs/>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async () => {
    return {props: {}};
}

export default AuthPage;
