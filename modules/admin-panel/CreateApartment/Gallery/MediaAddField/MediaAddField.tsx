import React from 'react';
import s from './MediaAddField.module.scss';
import {Button} from "@mui/material";
import {useFieldArray, useForm,FormProvider} from "react-hook-form";
import Input from "@/components/Input";


type MediaAddFieldProps = {
    handlerCloseModal: () => void
}
const MediaAddField = ({handlerCloseModal}: MediaAddFieldProps) => {
    const methods = useForm({
        defaultValues: {
            info: [{title: "", description: ""}]
        },
        mode: "onSubmit"
    });
    const {fields,remove,append} = useFieldArray({
        name: "info",
        control: methods.control
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <div className={s.content}>
            <div className={s.header}>
                <h3>Добавить поле</h3>
                <Button onClick={handlerCloseModal} >Закрыть</Button>
            </div>
           <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit(onSubmit)}>
                   <div className={s.list}>
                       {fields.map((item, index) => {
                           return (
                               <div className={s.item} key={item.id}>
                                   <Input name={`info.${index}.title`} label='Имя описание'/>
                                   <Input name={`info.${index}.description`} label='Описание'/>
                                   <Button type="button" variant='contained'  color='error' onClick={() => remove(index)}>
                                      Удалить
                                   </Button>
                               </div>
                           );
                       })}
                   </div>
                   <div className={s.addField}>
                       <Button
                           type="button"
                           onClick={() => {
                               append({title: "", description: ""});
                           }}
                       >
                           Добавить еще
                       </Button>
                   </div>
                  <div className={s.footer}>
                      <Button type="reset" variant='outlined' onClick={handlerCloseModal}>
                          Отменить
                      </Button>
                      <Button variant='contained' type="submit" >
                          Создать
                      </Button>
                  </div>
               </form>
           </FormProvider>
        </div>

    );
};

export default MediaAddField;