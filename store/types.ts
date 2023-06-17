import {UserModelType} from "@/entities/user/model/userReducer";
import {AlertsModelType} from "@/shared/ui/Alert/alertReducer";
import {ApartmentModelType} from "@/entities/apartment/model";

export type RootState = {
    user: UserModelType
    alerts:AlertsModelType
    apartment:ApartmentModelType

}