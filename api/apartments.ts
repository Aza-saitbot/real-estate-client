import axios from "@/core/axios";
import * as types from "./dto/apartments.dto";


export const getAllApartmentsAPI = async (): Promise<types.IApartment[]> =>
    (await axios.get('/apartment')).data

export const getApartments = async (requestOptions: types.IGetApartmentsRequest): Promise<types.IApartment[]> => {
    try {
        const listApartments = await getAllApartmentsAPI()
        const {limit, page } = requestOptions
        return listApartments.slice((page - 1) * limit, page * limit)
    } catch (e) {
        return []
    }
}

export const createApartmentAPI = async (requestOptions: types.CreateApartmentRequestType): Promise<types.IApartment> =>
    (await axios.post('apartment', requestOptions)).data

export const updateApartmentAPI = async (requestOptions: types.IApartment): Promise<types.IApartment> =>{
    const {id,...rest} = requestOptions
    return (await axios.put(`apartment/${id}`, rest)).data
}


export const getOneApartmentAPI = async (id: string): Promise<types.IApartment> =>
    (await axios.get(`/apartment/${id}`)).data

export const uploadImagesAPI = async (images:FormData): Promise<Array<string>> =>
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