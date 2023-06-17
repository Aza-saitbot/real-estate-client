import React from 'react';
import s from './style.module.scss';
import {useTranslation} from "next-i18next";
import {FormProvider, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/store/store";
import Dropdown from "@/shared/ui/Dropdown";
import {Button} from "@mui/material";
import Input from "@/shared/ui/Input";
import {useRouter} from "next/router";
import {EditApartmentProps} from "../../../pages/apartments/edit/[id]";
import {createApartment, updateApartment} from "@/entities/apartment/model";
import Gallery from "@/entities/gallery/Gallery";
import {CreateApartmentDto} from "@/shared/api/apartments/dto/CreateApartment.dto";

const listCurrency = ['USD', 'EUR', 'RUB', 'TRY'].map(currency => ({id: currency, name: currency}))

export type CreateEditApartmentFormType = {
    title: string
    currency: string
    price: number
    categoryId: number
    employeeId: number
    address: string
    images: Array<string>
}

const CreateApartment = ({editApartment}: EditApartmentProps) => {
    const {t, i18n} = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const employees = useAppSelector(state => state.apartment.employees)
        .map(({id,name})=>({id,name}))
    const categories = useAppSelector(state => state.apartment.categories)

    const defaultValues: CreateEditApartmentFormType = {
        title: editApartment?.title ? editApartment.title : '',
        currency: editApartment?.currency ?? listCurrency[0].name,
        price: editApartment?.price ? editApartment.price : 0,
        address: editApartment?.address ?? '',
        categoryId: editApartment?.categoryId ?? categories[0].id,
        employeeId: editApartment?.employeeId ?? employees[0].id,
        images: editApartment?.images ?? []
    }
    console.log('editApartment?.images',editApartment)
    const methods = useForm<CreateEditApartmentFormType>({
        mode: 'onSubmit',
        defaultValues
    })


    const onHandlerReset = async () => {
        methods.reset(defaultValues)
        await router.push('/apartments')
    }
    const onHandlerSave = async (data: CreateEditApartmentFormType) => {
        console.log('onHandlerSave',data)
        if (editApartment){
            const res = await dispatch(updateApartment({
                ...data,
                id: editApartment.id,
                images:String(data.images)
            }))
            if (res.meta.requestStatus === 'fulfilled') {
                await router.push('/apartments')
            }
        }else {
            const res = await dispatch(createApartment({
                ...data,
                images:String(data.images)
            }))
            if (res.meta.requestStatus === 'fulfilled') {
                await router.push('/apartments')
            }
        }
    }

    const onHandlerCreateField = () => {

    }

    return (
        <div className={s.wrapper}>
            <div className={s.createApartment}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onHandlerSave)}>
                        <div>
                            <div className={s.header}>
                                <h1> {editApartment ? editApartment.title : 'Добавить недвижимость'}</h1>
                                <div className={s.headerButtons}>
                                    <Button variant="outlined" type='reset' onClick={onHandlerReset}>Отменить</Button>
                                    <Button type='submit' variant="contained">Сохранить</Button>
                                </div>
                            </div>
                            <div className={s.list}>
                                <Dropdown className={s.widthInput} name='employeeId' list={employees} label='Сотрудники'/>
                                <Dropdown className={s.widthInput} name='categoryId' list={categories} label='Категории'/>
                                <Input className={s.widthInput} name="title" label="title"/>
                                <Dropdown className={s.widthInput} name="currency" list={listCurrency} label='Валюта'/>
                                <Input className={s.widthInput} name="price" label="price" type='number'/>
                                <Input className={s.widthInput} name="address" label="address"/>
                                <div>
                                    <h3>Gallery</h3>
                                </div>
                                <Gallery />
                            </div>
                            <Button onClick={onHandlerCreateField} type='button' variant='outlined'>
                                Добавить поле
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
};

export default CreateApartment;