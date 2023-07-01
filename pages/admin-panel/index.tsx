import React from 'react';
import TableApartments from "@/modules/admin-panel/TableApartments/TableApartments";
import {Button} from "@mui/material";
import s from "@/styles/Admin.module.scss"
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {checkAuth} from "@/utils/checkAuth";
import {DataAdminPanelType} from "@/api/apartments";

const AdminPanelPage = () => {
    const router = useRouter()
    const redirectCreateApartment = async () => {
        await router.push('/create-apartment', '/create-apartment', {locale: router.locale})
    }
    return (
        <div className={s.admin}>
            Ad
        </div>
    );
};

// <div className={s.header}>
//     <h3>Список недвижимостей</h3>
//     <Button onClick={redirectCreateApartment} variant='outlined' style={{backgroundColor: 'white'}}>
//         Добавить
//     </Button>
// </div>
// <TableApartments {...props} />

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//     return {
//         props: {}
//     }
// }


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    try {
        const {props} = await checkAuth(ctx)

        if (props?.user?.roles.includes('ADMIN')) {
           if (props?.user?.roles.includes('ADMIN')){
               const data = await Api.apartments.getDataAdminPanel()
               return {
                   props: {...data}
               }
           }else {
               return {
                   redirect: {
                       destination: `/${ctx.locale}/user`,
                       locale: true,
                       permanent: false
                   },
                   props: {}
               }
           }
        }
    } catch (e) {
        return {
            props: {}
        }
    }
}

export default AdminPanelPage;
