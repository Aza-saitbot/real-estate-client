import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {checkAuth} from "@/utils/checkAuth";
import {GetServerSidePropsContext} from "next";

const User = () => <div>User Profile</div>

export const getServerSideProps = async (ctx: GetServerSidePropsContext)=> {
    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    return {
        props: {...(await serverSideTranslations(ctx?.locale as string, ['common']))}
    }

}

export default User;