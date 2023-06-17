import React from 'react';
import {wrapper} from "@/store/store";
import TableApartments from "@/modules/Admin/TableApartments/TableApartments";
import {Button} from "@mui/material";
import s from "@/styles/Admin.module.scss"
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";

const AdminPage = () => {
    const router = useRouter()
    const onRedirectCreateApartment = async () => {
        await router.push('/apartments/create', '/apartments/create', { locale:router.locale })
    }
    return (
        <div className={s.admin}>
            <div className={s.header}>
                <h3>Список недвижимостей</h3>
                <Button onClick={onRedirectCreateApartment} variant='outlined' style={{backgroundColor:'white'}} >Добавить</Button>
            </div>
            <TableApartments/>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext) => {
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


export default AdminPage;
