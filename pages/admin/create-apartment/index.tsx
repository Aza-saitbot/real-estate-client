import CreateApartment from "@/modules/AdminPanel/CreateApartment/CreateApartment";
import {wrapper} from "@/redux/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const CreateApartmentPage = () => <CreateApartment/>

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

    await getCategoriesEmployees(ctx)

    return {
        props: {...translationObj}
    }
})

export default CreateApartmentPage;