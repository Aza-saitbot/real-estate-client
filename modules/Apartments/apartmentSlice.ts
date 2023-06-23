import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as types from "@/api/dto/apartments.dto";
import * as Api from "@/api";

export type ApartmentSliceType = {
    apartments:types.IApartment[]
    total:number
    employees: types.IEmployee[]
    categories:types.ICategory[]
}
const initialState: ApartmentSliceType = {
    apartments:[],
    total:0,
    employees:[],
    categories:[]
}

export const createApartment = createAsyncThunk<types.IApartment,  types.IGetApartmentsRequest, { rejectValue: number; }>(
    'apartments/createApartment', async (requestOptions, { rejectWithValue }) => {
        try {
            return await Api.apartments.createApartmentAPI(requestOptions)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

export const updateApartment = createAsyncThunk<types.IApartment,  types.IApartment, { rejectValue: number; }>(
    'apartments/updateApartment', async (requestOptions, { rejectWithValue }) => {
        try {
            return await Api.apartments.updateApartmentAPI(requestOptions)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

export const uploadImages = createAsyncThunk<Array<string>,  FileList, { rejectValue: number; }>(
    'apartments/uploadImages', async (files, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            return await Api.apartments.uploadImagesAPI(formData)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

export const getAllApartments = createAsyncThunk<types.IApartment[],  void, { rejectValue: number; }>(
    'apartments/getAllApartments', async (requestOptions, { rejectWithValue }) => {
        try {
            return await Api.apartments.getAllApartmentsAPI()
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

export const getOneApartment = createAsyncThunk<types.IApartment, string, { rejectValue: number; }>(
    'apartments/getOneApartment', async (id, { rejectWithValue }) => {
        try {
            return await Api.apartments.getOneApartmentAPI(id)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setApartments: (state, action: PayloadAction<typesResponseGetApartments>) => {
            state.apartments = action.payload.apartments
            state.total = action.payload.total
        },
        setAllEmployees: (state, action: PayloadAction<typesIEmployee[]>) => {
            state.employees = action.payload
        },
        addEmployee: (state, action: PayloadAction<typesIEmployee>) => {
            state.employees.push(action.payload)
        },
        setAllCategories: (state, action: PayloadAction<typesICategory[]>) => {
            state.categories = action.payload
        },
        addCategory: (state, action: PayloadAction<typesICategory>) => {
            state.categories.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
                state.employees = action.payload.apartment.employees
                state.categories = action.payload.apartment.categories
                state.apartments = action.payload.apartment.apartments
                state.total = action.payload.apartment.total
            })
    }
});


export const {setAllEmployees,addEmployee,setAllCategories,addCategory,setApartments} = apartmentsSlice.actions;
export const apartmentReducer = apartmentsSlice.reducer;