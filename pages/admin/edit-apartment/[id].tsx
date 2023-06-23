import React from 'react';
import {wrapper} from "@/redux/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CreateApartment from "@/modules/AdminPanel/CreateApartment/CreateApartment";
import {IApartment} from "@/modules/types";

export type EditApartmentProps = {
    editApartment?: IApartment
}
const EditApartmentPage = ({editApartment}: EditApartmentProps) => <CreateApartment editApartment={editApartment}/>


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

export default EditApartmentPage;