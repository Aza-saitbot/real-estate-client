
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
    images:Array<string>
}

export type GetApartmentResponseType = Omit<IApartment, 'images'> & { images:Array<{filename:string}> }

export type CreateApartmentRequestType = Omit<IApartment, 'id' | 'images'> & { images:string}
export type EditApartmentRequestType = Omit<IApartment, 'images'> & { images:string}

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

