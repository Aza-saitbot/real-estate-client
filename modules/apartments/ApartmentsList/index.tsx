import React, {useContext} from 'react';
import Pagination from "@/components/Pagination";
import {PER_PAGE} from "@/components/Pagination/config";
import s from "./ApartmentsList.module.scss";
import ApartmentCard from "@/modules/apartments/ApartmentCard/ApartmentCard";
import ApartmentsPlug from "@/modules/apartments/ApartmentsPlug";
import {IApartment} from "@/api/dto/apartments.dto";
import {LayoutContext} from "@/layout/Layout";

type ApartmentsListProps = {
    apartments: Array<IApartment>,
    currentPage: number
}
const ApartmentsList = ({apartments,currentPage}:ApartmentsListProps) => {
    const { alertData } = useContext(LayoutContext);
    console.log('apartments',apartments)
    if (apartments?.length === 0) {
        return <ApartmentsPlug />
    }

    return (
        <div className={s.content}>
            <div className={s.list}>
                {[...apartments,...apartments,
                    ...apartments,...apartments,...apartments,
                    ...apartments,...apartments]?.map(apartment =>
                    <ApartmentCard key={apartment.id} {...apartment} />
                )}
            </div>
            <Pagination
                totalItems={apartments.length}
                currentPage={currentPage}
                itemsPerPage={PER_PAGE}
                renderPageLink={(page) => `/apartments/${page}`}
            />
        </div>
    );
};

export default ApartmentsList;