import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {alertReducer} from "@/components/Alert/alertReducer";
import {apartmentReducer} from "@/modules/Apartments/apartmentSlice";

const isDev = process.env.NODE_ENV === 'development';

const rootReducer = combineReducers({
    user: userReducer,
    alerts: alertReducer,
    apartment: apartmentReducer
})

const store = configureStore({
    reducer: rootReducer,
    devTools: isDev,
})

export type RootState = ReturnType<typeof rootReducer>
export const makeStore = (): Store<RootState> => store

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper(makeStore, {debug: isDev});