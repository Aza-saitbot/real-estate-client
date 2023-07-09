import React from 'react';
import TableApartments from "@/modules/admin-panel/TableApartments/TableApartments";
import {Button} from "@mui/material";
import s from "@/styles/Admin.module.scss"
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {checkAuth} from "@/utils/checkAuth";
import {DataAdminPanelType} from "@/api/apartments";
import {Layout} from "@/layout/Layout";
import {IUser} from "@/api/dto/auth.dto";

type AdminPanelPageProps = {
    user: IUser
} & DataAdminPanelType
const AdminPanelPage = ({user,...props}: AdminPanelPageProps) => {
    const router = useRouter()
    const redirectCreateApartment = async () => {
        await router.push('admin-panel/create-apartment', 'admin-panel/create-apartment', {locale: router.locale})
    }
    return (
        <Layout title='Страница/панель администратора' user={user}>
            <div className={s.admin}>
                <div className={s.header}>
                    <h3>Список недвижимостей</h3>
                    <Button onClick={redirectCreateApartment} variant='outlined' style={{backgroundColor: 'white'}}>
                        Добавить
                    </Button>
                </div>
                <TableApartments {...props} />
            </div>
        </Layout>
    );
};


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)
    if ('redirect' in authProps) {
        console.log('REDIRECT ADMI PAGE',authProps)
        return authProps
    }
    try {
        const user = authProps.props?.user
        console.log('user',user)
        if (user) {
            if (user?.roles.includes('ADMIN')) {
                const data = await Api.apartments.getDataAdminPanel()
                return {
                    props: {
                        ...data,
                        user
                    }
                }
            }
            return {
                redirect: {
                    destination: `/${ctx.locale}/user`,
                    locale: true,
                    permanent: false
                },
                props: {}
            }

        }
    } catch (e) {
        return {
            props: {}
        }
    }
}

export default AdminPanelPage;
