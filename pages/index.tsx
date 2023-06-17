import {FileItem} from "@/api/dto/files.dto";
import {GetServerSidePropsContext,GetStaticPropsContext, NextPage} from "next";
import {Files} from "@/modules/Files";
import React from "react";
import {checkAuth} from "@/utils/checkAuth";
import * as Api from "@/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@/store/store";
import {Layout} from "@/layout/Layout";


interface Props {
    items: FileItem[];
}

const ApartmentsPage: NextPage<Props> = ({ items }) => {
    return (
        <Layout>
            <Files items={items} withActions />
        </Layout>
    );
};

ApartmentsPage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getStaticProps = wrapper.getStaticProps(async (ctx:GetStaticPropsContext) => {
    try {
        const payload = await api.apartments.getApartments({limit: PER_PAGE, page: 1})
        if (payload.apartments.length && ctx?.locale) {
            return {
                props: {
                    ...(await serverSideTranslations(ctx.locale, ['common'])),
                    ...payload,
                    currentPage: 1,
                }
            };
        }
    } catch (err) {
    }

    return {props: {}};
});

export default ApartmentsPage;
