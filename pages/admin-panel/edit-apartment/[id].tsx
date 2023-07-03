import React from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CreateApartment from "@/modules/admin-panel/CreateApartment/CreateApartment";
import {GetServerSidePropsContext} from "next";
import {checkAuth} from "@/utils/checkAuth";
import * as Api from "@/api";
import {IApartment, ICategory, IEmployee} from "@/api/dto/apartments.dto";
import {Layout} from "@/layout/Layout";

export type CreateEditApartmentProps = {
    editApartment?: IApartment
    employees: IEmployee[]
    categories: ICategory[]

}
const EditApartmentPage = (props: CreateEditApartmentProps) => (
    <Layout title='Страница/редактирования апартамента'>
        <CreateApartment {...props}/>
    </Layout>
)


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    try {
        const {props} = await checkAuth(ctx)

        if (props?.user?.roles.includes('ADMIN')) {
            if (props?.user?.roles.includes('ADMIN')){
                console.log('ctx.query.id',ctx.query.id)
                const editApartment = await Api.apartments.getOneApartment(ctx.query.id as string)
                console.log('editApartment',editApartment)
                const employees = await Api.apartments.getEmployees()
                const categories = await Api.apartments.getCategories()
                return {
                    props: {
                        editApartment,
                        employees,
                        categories
                    }
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

export default EditApartmentPage;