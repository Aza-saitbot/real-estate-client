import React from 'react';
import {wrapper} from "@/redux/store";
import TableApartments from "@/modules/AdminPanel/TableApartments/TableApartments";
import {Button} from "@mui/material";
import s from "@/styles/Admin.module.scss"
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {checkAuth} from "@/utils/checkAuth";

const AdminPage = () => {
    const router = useRouter()
    const redirectCreateApartment = async () => {
        await router.push('/create-apartment', '/create-apartment', { locale:router.locale })
    }
    return (
        <div className={s.admin}>
            <div className={s.header}>
                <h3>Список недвижимостей</h3>
                <Button onClick={redirectCreateApartment} variant='outlined' style={{backgroundColor:'white'}} >
                    Добавить
                </Button>
            </div>
            <TableApartments/>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

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


export default AdminPage;
