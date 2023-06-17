import React from 'react';
import {Store} from "@reduxjs/toolkit";
import {RootState} from "@/store/types";
import {AnyAction} from "redux";
import {GetServerSidePropsContext} from "next";
import {wrapper} from "@/store/store";
import * as api from "@/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getCategoriesEmployees} from "@/shared/api/apartments/getCategoriesEmployees";
import Alert from "@/shared/ui/Alert/Alert";
import CreateApartmentPage from "@/pages-flat/CreateApartment/CreateApartment";
import Header from "@/widgets/Header";
import {GetServerSidePropsType} from "@/shared/types/types";
import {IApartment} from "@/shared/api/apartments/model";
import {getOneApartment} from "@/entities/apartment/model";
import {addAlertWithCustomText} from "@/shared/ui/Alert/alertReducer";

export type EditApartmentProps = {
    editApartment?: IApartment
}
const EditApartment = ({editApartment}: EditApartmentProps) => {
    return (
        <>
            <Alert/>
            <Header/>
            <CreateApartmentPage editApartment={editApartment}/>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }
    const translationObj = {...(await serverSideTranslations(ctx.locale, ['common']))}
    const isAdmin = ctx.store.getState().user.user.roles.includes('ADMIN')

    if (!isAdmin) {
        return {
            redirect: {
                destination: `/${ctx.locale}/user`,
                locale: true,
                permanent: false
            },
            props: {...translationObj}
        }
    }

    try {
        const {payload} = await ctx.store.dispatch(getOneApartment(ctx.query.id))
        if (payload === 8) {
            return {
                redirect: {
                    destination: `/${ctx.locale}/apartments`,
                    locale: true,
                    permanent: false
                },
                props: {...translationObj}
            }
        }
        await getCategoriesEmployees(ctx)
        return {
            props: {
                editApartment: payload,
                ...translationObj
            }
        }

    } catch (e) {
        return {
            redirect: {
                destination: `/${ctx.locale}/apartments`,
                locale: true,
                permanent: false
            },
            props: {...translationObj}
        }
    }
})

export default EditApartment;