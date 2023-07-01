import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";
import {useContext} from "react";
import {LayoutContext} from "@/layout/Layout";
import {IUser} from "@/api/dto/auth.dto";

export const checkAuth = async (ctx: GetServerSidePropsContext)
    : Promise<{props: {user: IUser}} | {redirect: {permanent: boolean, destination: string}}>=> {
  const { _token } = nookies.get(ctx);
  const { setUser } = useContext(LayoutContext);

  axios.defaults.headers.Authorization = "Bearer " + _token;

  try {
    const user = await Api.auth.getMe();
    console.log('user',user)
    setUser(user);

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
