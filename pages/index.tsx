import {GetStaticPropsContext, NextPage} from "next";
import React from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Layout} from "@/layout/Layout";
import * as Api from "@/api";
import {PER_PAGE} from "@/components/Pagination/config";
import {IApartment} from "@/api/dto/apartments.dto";
import ApartmentsList from "@/modules/Apartments/ApartmentsList";


interface Props {
    apartments: Array<IApartment>
    currentPage: number
}

const ApartmentsPage: NextPage<Props> = (props) => {
    return (
        <Layout title="Главная страница">
            <ApartmentsList {...props}/>
        </Layout>
    );
};

export const getStaticProps = async (ctx:GetStaticPropsContext) => {
    try {
        const {apartments} = await Api.apartments.getApartments({limit: PER_PAGE, page: 1})
        if (apartments.length) {
            return {
                props: {
                    ...(await serverSideTranslations(ctx.locale as string, ['common'])),
                    apartments,
                    currentPage: 1,
                }
            };
        }
    } catch (err) {
    }

    return {props: {}};
};

export default ApartmentsPage;
