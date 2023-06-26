import CreateApartment from "@/modules/admin-panel/CreateApartment/CreateApartment";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {getOneApartment} from "@/api/apartments";


const CreateApartmentPage = () => <CreateApartment/>

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
        const employees = await Api.apartments.getEmployees()
        const categories = await Api.apartments.getCategories()
        const editApartmentId = ctx.query.id
        let editApartment = null
        if (editApartmentId){
            editApartment = await Api.apartments.getOneApartment(editApartmentId)
        }

        return {
            props: {
                ...translationObj,
                employees,
                categories,
            }
        }
    } catch (e) {
        return {
            props: {...translationObj}
        }
    }


}

export default CreateApartmentPage;