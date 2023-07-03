import CreateApartment from "@/modules/admin-panel/CreateApartment/CreateApartment";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";
import * as Api from "@/api";
import {CreateEditApartmentProps} from "@/pages/admin-panel/edit-apartment/[id]";
import {Layout} from "@/layout/Layout";


const CreateApartmentPage = (props: CreateEditApartmentProps) => (
    <Layout title='Страница/создании апартамента'>
        <CreateApartment {...props}/>
    </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const {props} = await checkAuth(ctx)

        if (props?.user?.roles.includes('ADMIN')) {
            if (props?.user?.roles.includes('ADMIN')) {
                const employees = await Api.apartments.getEmployees()
                const categories = await Api.apartments.getCategories()
                return {
                    props: {
                        employees,
                        categories
                    }
                }
            } else {
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

export default CreateApartmentPage;