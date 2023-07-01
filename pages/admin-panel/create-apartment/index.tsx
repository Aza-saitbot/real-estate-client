import CreateApartment from "@/modules/admin-panel/CreateApartment/CreateApartment";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {CreateEditApartmentProps} from "@/pages/admin-panel/edit-apartment/[id]";


const CreateApartmentPage = (props:CreateEditApartmentProps) => <CreateApartment {...props}/>

export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    const isAdmin = authProps.props.user.roles.includes('ADMIN')
    if (!isAdmin) {
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
        const employees = await Api.apartments.getEmployees()
        const categories = await Api.apartments.getCategories()
        return {
            props: {
                employees,
                categories
            }
        }
    } catch (e) {
        return {
            props: {}
        }
    }


}

export default CreateApartmentPage;