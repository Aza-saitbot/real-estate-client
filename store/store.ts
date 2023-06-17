import {configureStore, Store} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {isDev} from "@/shared/consts/consts";
import {combineReducers} from "redux";
import {userReducer} from "@/entities/user/model/userReducer";
import {RootState} from "@/store/types";
import {alertReducer} from "@/shared/ui/Alert/alertReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apartmentReducer} from "@/entities/apartment/model";


const rootReducer = combineReducers({
    user: userReducer,
    alerts: alertReducer,
    apartment: apartmentReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: isDev,
})

export const makeStore = (): Store<RootState> => store
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const wrapper = createWrapper(makeStore, {debug: isDev});