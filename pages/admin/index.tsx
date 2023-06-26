import React from 'react';
import TableApartments from "@/modules/admin-panel/TableApartments/TableApartments";
import {Button} from "@mui/material";
import s from "@/styles/Admin.module.scss"
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {checkAuth} from "@/utils/checkAuth";
import {DataAdminPanelType} from "@/api/apartments";

const AdminPage = (props: DataAdminPanelType) => {
    const router = useRouter()
    const redirectCreateApartment = async () => {
        await router.push('/create-apartment', '/create-apartment', {locale: router.locale})
    }
    return (
        <div className={s.admin}>
            <div className={s.header}>
                <h3>Список недвижимостей</h3>
                <Button onClick={redirectCreateApartment} variant='outlined' style={{backgroundColor: 'white'}}>
                    Добавить
                </Button>
            </div>
            <TableApartments {...props} />
        </div>
    );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps;
    }
    const translationObj = {...(await serverSideTranslations(ctx?.locale as string, ['common']))}
    if (!authProps.props.user.roles.includes('ADMIN')) {
        return {
            redirect: {
                destination: `/${ctx.locale}/user`,
                locale: true,
                permanent: false
            },
            props: {}
        }
    }

    try {
        const data = await Api.apartments.getDataAdminPanel()
        return {
            props: {
                ...translationObj,
                ...data
            }
        }
    } catch (e) {
        return {
            props: {...translationObj}
        }
    }
}


export default AdminPage;
