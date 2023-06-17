import React from 'react';
import Pagination from "@/components/Pagination";
import {PER_PAGE} from "@/components/Pagination/config";
import s from "./ApartmentsList.module.scss";
import ApartmentCard from "@/modules/Apartments/components/ApartmentCard/ApartmentCard";

type ApartmentsListProps = {
    apartments: any,
    total: number,
    currentPage: number
}
const ApartmentsList = ({apartments,total,currentPage}:ApartmentsListProps) => {
    return (
        <div>
            <div className={s.list}>
                {apartments?.map(apartment =>
                    <ApartmentCard key={apartment.id} {...apartment} />
                )}
            </div>
            <Pagination
                totalItems={total}
                currentPage={currentPage}
                itemsPerPage={PER_PAGE}
                renderPageLink={(page) => `/${page}`}
            />
        </div>
    );
};

export default ApartmentsList;