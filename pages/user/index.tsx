import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/store/types";
import {AnyAction} from "redux";
import {GetServerSidePropsContext} from "next";
import {wrapper} from "@/store/store";
import * as api from "@/shared/api";
import Header from "@/widgets/Header";
import UserPage from "@/pages-flat/user";
import Alert from "@/shared/ui/Alert/Alert";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {GetServerSidePropsType} from "@/shared/types/types";

const User = (props:any) => {

    return (
        <>
            <Alert/>
            <Header/>
            <UserPage/>
        </>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(async (ctx:GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    return {
        props: {...(await serverSideTranslations(ctx?.locale, ['common']))}
    }

})

export default User;