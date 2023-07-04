import React, {useContext, useEffect} from 'react';
import s from './CreateApartment.module.scss';
import {useTranslation} from "next-i18next";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@mui/material";
import * as Api from "@/api/index";
import {useRouter} from "next/router";
import {CreateEditApartmentProps} from "@/pages/admin-panel/edit-apartment/[id]";
import * as types from "@/api/dto/apartments.dto";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Gallery from "@/modules/admin-panel/CreateApartment/Gallery/Gallery";
import {LayoutContext} from "@/layout/Layout";

const listCurrency = ['USD', 'EUR', 'RUB', 'TRY'].map(currency => ({id: currency, name: currency}))

export type CreateApartmentFormType = {
    title: string
    currency: string
    price: number
    categoryId: number
    employeeId: number
    address: string
}

const CreateApartment = ({editApartment, employees, categories}: CreateEditApartmentProps) => {
    const {t, i18n} = useTranslation()
    const router = useRouter()
    const {setImages,images} = useContext(LayoutContext)

    const defaultValues: CreateApartmentFormType = {
        title: editApartment?.title ? editApartment.title : '',
        currency: editApartment?.currency ?? listCurrency[0].name,
        price: editApartment?.price ? editApartment.price : 0,
        address: editApartment?.address ?? '',
        categoryId: editApartment?.categoryId ?? categories[0].id,
        employeeId: editApartment?.employeeId ?? employees[0].id
    }

    const methods = useForm<CreateApartmentFormType>({
        mode: 'onSubmit',
        defaultValues
    })


    const onHandlerReset = async () => {
        methods.reset(defaultValues)
        await router.push('/admin-panel')
    }
    const onHandlerSave = async (data: CreateApartmentFormType) => {
        console.log('onHandlerSave', data)
        if (editApartment) {
            try {
                 await Api.apartments.updateApartment({
                    ...data,
                    id: editApartment.id,
                    images: String(images)
                })
                await router.push('/admin-panel')
            } catch (e) {}
        } else {
            try {
                await Api.apartments.createApartment({
                    ...data,
                    images: String(images)
                })
                await router.push('/admin-panel')
            } catch (e) {
            }
        }
    }

    useEffect(()=>{
        if (editApartment){
            setImages(editApartment.images)
        }
    },[editApartment])

    return (
        <div className={s.wrapper}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onHandlerSave)}>
                        <div className={s.createApartment}>
                            <div className={s.header}>
                                <h1> {editApartment ? editApartment.title : 'Добавить недвижимость'}</h1>
                                <div className={s.headerButtons}>
                                    <Button variant="outlined" type='reset' onClick={onHandlerReset}>Отменить</Button>
                                    <Button type='submit' variant="contained">Сохранить</Button>
                                </div>
                            </div>
                            <div className={s.list}>
                                <Dropdown className={s.widthInput} name='employeeId' list={employees}
                                          label='Сотрудники'/>
                                <Dropdown className={s.widthInput} name='categoryId' list={categories}
                                          label='Категории'/>
                                <Input className={s.widthInput} name="title" label="title"/>
                                <Dropdown className={s.widthInput} name="currency" list={listCurrency} label='Валюта'/>
                                <Input className={s.widthInput} name="price" label="price" type='number'/>
                                <Input className={s.widthInput} name="address" label="address"/>
                                <Gallery />
                            </div>
                        </div>
                    </form>
                </FormProvider>
        </div>
    )
};

export default CreateApartment;