import {GetServerSidePropsContext} from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";
import {IUser} from "@/api/dto/auth.dto";

export const checkAuth = async (ctx: GetServerSidePropsContext)
    : Promise<{ props: { user: IUser } } | { redirect: { permanent: boolean, destination: string } }> => {
    const {_token} = nookies.get(ctx);
    axios.defaults.headers.Authorization = "Bearer " + _token;

    try {
        const user = await Api.auth.getMe();
        return {
            props: {
                user
            },
        }
    } catch (err) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }
};
