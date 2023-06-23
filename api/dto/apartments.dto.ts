import {DashboardCustomizeTwoTone} from "@mui/icons-material";

export interface IGetApartmentsRequest {
    limit:number
    page:number
}

export type IApartment = {
    id: number
    title: string
    currency: string
    price:number
    categoryId: number
    employeeId: number
    address:string
    images:string
}

export type CreateApartmentRequestType = Omit<IApartment, 'id'>

export interface IEmployee {
    id: number
    name: string
    phone: string
    username?: string | null
}

export type CreateEmployeeRequest = Omit<IEmployee, 'id'>

export interface ICategory {
    id: number
    name: string
}

export type CreateCategoryRequest = Omit<ICategory, 'id'>

