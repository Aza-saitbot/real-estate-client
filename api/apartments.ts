import axios from "@/core/axios";
import * as types from "./dto/apartments.dto";
import * as Api from "@/api/index";


const convertImages = (images: Array<{filename:string}>) => {
    return images.map(item => item.filename)
}

export const getAllApartmentsAPI = async (): Promise<types.IApartment[]> =>{
    const list:types.GetApartmentResponseType[] = (await axios.get('/apartment')).data
    return list.map(apartment => ({...apartment,images:convertImages(apartment.images)} ))
}

export const getApartments = async ({limit, page}: types.IGetApartmentsRequest): Promise<types.IApartment[]> => {
    try {
        const listApartments = await getAllApartmentsAPI()
        return listApartments.slice((page - 1) * limit, page * limit)
    } catch (e) {
        return []
    }
}

export type DataAdminPanelType = {
    apartments: types.IApartment[]
    employees: types.IEmployee[]
    categories: types.ICategory[]
}
export const getDataAdminPanel = async ():Promise<DataAdminPanelType|null> => {
    try {
        const apartments = await Api.apartments.getAllApartmentsAPI()
        const employees = await Api.apartments.getEmployees()
        const categories = await Api.apartments.getCategories()
        return { apartments, employees, categories }
    }catch (e) {
        return null
    }
}

export const createApartment = async (requestOptions: types.CreateApartmentRequestType): Promise<types.IApartment> =>
    (await axios.post('/apartment', requestOptions)).data

export const updateApartment = async (requestOptions: types.EditApartmentRequestType): Promise<types.IApartment> =>{
    const {id,...rest} = requestOptions
    return (await axios.put(`/apartment/${id}`, rest)).data
}

export const getOneApartment = async (id: string): Promise<types.IApartment> =>{
    const apartment = (await axios.get(`/apartment/${id}`)).data
    return {...apartment,images:convertImages(apartment.images)}
}


export const uploadImages = async (images:FormData): Promise<Array<string>> =>
    (await axios.post('files/upload',images)).data

export const createEmployee = async (dto:types.CreateEmployeeRequest):Promise<types.IEmployee> => {
    return (await axios.post('/employee',dto)).data
}


export const getEmployees = async ():Promise<types.IEmployee[]> => {
    return (await axios.get('/employee')).data
}


export const createCategory = async (dto:types.CreateCategoryRequest):Promise<types.ICategory> => {
    return (await axios.post('/employee',dto)).data
}

export const getCategories = async ():Promise<types.ICategory[]> => {
    return (await axios.get('/category')).data
}