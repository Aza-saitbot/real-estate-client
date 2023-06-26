import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { _token } = nookies.get(ctx);

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
