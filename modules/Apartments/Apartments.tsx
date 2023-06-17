import Pagination from "@/components/Pagination";
import ApartmentsPlug from "@/components/ApartmentsPlug/ApartmentsPlug";
import {useTranslation} from "next-i18next";
import {PER_PAGE} from "@/components/Pagination/config";
import ApartmentsList from "@/modules/Apartments/components/ApartmentsList/ApartmentsView";


const Apartments = ({apartments,total,currentPage}:ApartmentsListProps) => {

    if (!apartments){
        return <ApartmentsPlug text='Скоро на сайте появится информация о недвижимости' />
    }

    return <ApartmentsList />
};

export default Apartments;