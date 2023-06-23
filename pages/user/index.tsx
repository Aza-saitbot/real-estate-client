import {wrapper} from "@/redux/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const User = () => <div>User Profile</div>


export const getServerSideProps = wrapper.getServerSideProps(async (ctx:GetServerSidePropsType) => {
    const authProps = await api.checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    return {
        props: {...(await serverSideTranslations(ctx?.locale, ['common']))}
    }

})

export default User;