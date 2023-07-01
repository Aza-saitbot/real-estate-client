import React from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CreateApartment from "@/modules/admin-panel/CreateApartment/CreateApartment";
import {GetServerSidePropsContext} from "next";
import {checkAuth} from "@/utils/checkAuth";
import * as Api from "@/api";
import {IApartment, ICategory, IEmployee} from "@/api/dto/apartments.dto";

export type CreateEditApartmentProps = {
    editApartment?: IApartment
    employees: IEmployee[]
    categories: ICategory[]

}
const EditApartmentPage = (props: CreateEditApartmentProps) => <CreateApartment {...props}/>


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }
    const translationObj = {...(await serverSideTranslations(ctx.locale as string, ['common']))}
    const isAdmin = authProps.props.user.roles.includes('ADMIN')
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
        let editApartment
        const employees = await Api.apartments.getEmployees()
        const categories = await Api.apartments.getCategories()
        if (ctx.query.id){
            editApartment = await Api.apartments.getOneApartment(ctx.query.id)
        }

        return {
            props: {
                ...translationObj,
                employees,
                categories,
                editApartment
            }
        }
    } catch (e) {
        return {
            props: {...translationObj}
        }
    }
}

export default EditApartmentPage;