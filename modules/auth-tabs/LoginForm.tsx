import React, {useContext} from "react";
import s from "./AuthTabs.module.scss";
import { setCookie } from "nookies";
import { LoginFormDTO } from "@/api/dto/auth.dto";
import * as Api from "@/api";
import {Form, useForm,FormProvider} from "react-hook-form";
import {Button} from "@mui/material";
import Input from "@/components/Input";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {LayoutContext} from "@/layout/Layout";

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const {locale} = router
  const {t, i18n} = useTranslation()

  const methods = useForm<LoginFormDTO>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: LoginFormDTO) => {
    try {
      const { token } = await Api.auth.login(values);
      setCookie(null, "_token", token, {
        path: "/",
      });
      console.log('ROUTE')
      await router.push('/admin-panel')
      console.log('2222222 ROUTE')
    } catch (err) {
      console.warn("LoginForm", err);
    }
  };

  const options = {required: {value: true, message: 'Обязательное поле'}}

  return (
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={s.formBlock}>
              <Input name='email' options={options} label="Email"/>
              <Input name='password' options={options} label="Password" type='password'/>
              <Button type='submit' variant='outlined'>Авторизоваться</Button>
            </div>
          </form>
        </FormProvider>
      </div>
  );
};
