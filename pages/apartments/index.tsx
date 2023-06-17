import React from 'react';
import {wrapper} from "@/store/store";
import * as api from '@/shared/api';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ApartmentsPage from "@/pages-flat/ApartmentsPage/ApartmentsPage";
import Header from "@/widgets/Header";
import Alert from "@/shared/ui/Alert/Alert";
import {GetServerSidePropsType} from "@/shared/types/types";
import {IApartment} from "@/shared/api/apartments/model";
import {setApartments} from "@/entities/apartment/model";
import {getCategoriesEmployees} from "@/shared/api/apartments/getCategoriesEmployees";

const Apartments = (listApartments?:IApartment[]) => {
    return (
        <>
            <Alert/>
            <Header/>
            <ApartmentsPage listApartments={listApartments}/>
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
        const listApartments = await api.apartments.getAllApartmentsAPI()
        await getCategoriesEmployees(ctx)
        ctx.store.dispatch(setApartments({
            apartments:listApartments,
            total:listApartments.length
        }))
        return {
            props: {
                ...translationObj,
                listApartments
            }
        }
    }catch (e) {
        return {
            props: {...translationObj}
        }
    }
})

export default Apartments