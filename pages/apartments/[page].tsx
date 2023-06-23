import React from 'react';
import {GetStaticPaths, GetStaticPropsContext} from "next";
import {Layout} from "@/layout/Layout";
import ApartmentsList from "@/modules/Apartments/ApartmentsList";
import {IApartment} from "@/api/dto/apartments.dto";
import * as Api from "@/api";
import {PER_PAGE} from "@/components/Pagination/config";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type ApartmentsListProps = {
    apartments: Array<IApartment>,
    currentPage: number
}

function PaginatedPage(props: ApartmentsListProps) {
    return (
        <Layout title={`Текущая стр./${props.currentPage}`}>
            <ApartmentsList {...props}/>
        </Layout>
    )
}

export const getStaticProps = async ({params, locale}: GetStaticPropsContext) => {
    try {
        const page = Number(params?.page) || 1
        const {apartments} = await Api.apartments.getApartments({limit: PER_PAGE, page: 1})

        if (!apartments.length) {
            return {
                notFound: true,
            }
        }

        if (page === 1) {
            return {
                redirect: {
                    destination: '/',
                    locale: true,
                    permanent: false,
                },
            }
        }

        return {
            props: {
                ...(await serverSideTranslations(locale as string, ['common'])),
                apartments,
                currentPage: page,
            },
            revalidate: 60 * 60 * 24, // ISR cache: once a day
        };
    } catch (err) {
        return {
            props: {},
            redirect: {
                destination: '/',
                locale: true,
                permanent: false,
            }
        };
    }
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    return {
        paths: Array.from({length: 5}).map((_, i) => `/${i + 2}`),
        // Block the request for non-generated pages-flat and cache them in the background
        fallback: 'blocking',
    }
}


export default PaginatedPage
