import {GetServerSidePropsContext, NextPage} from "next";
import s from "@/styles/Auth.module.scss"
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useAppDispatch, wrapper} from "@/redux/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


type SchemaLogin = {
    email: string;
    password: string;
    fullName?: string;
}

const AuthPage: NextPage = () => {
    const router = useRouter()
    const {locale} = router
    const dispatch = useAppDispatch()
    const {t, i18n} = useTranslation()
    const [modeAuth, setModeAuth] = useState<'login' | 'registration'>('login')
    const isModeLogin = modeAuth === 'login'

    const methods = useForm<SchemaLogin>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
            fullName: ''
        }
    });

    const onSubmit = async (data: SchemaLogin) => {
        let payload: AuthUserDTO = {
            email: data.email,
            password: data.password,
            url: modeAuth,
        }
        if (data.fullName) payload.fullName = data.fullName
        const res = await dispatch(authThunk(payload))
        if (res.meta.requestStatus === 'fulfilled') {
            await router.push('/apartments', '/apartments', {locale})
        }
    }

    const optionsFillName = isModeLogin ? {} : {
        required: {
            value: true,
            message: 'Обязательное поле'
        }
    }

    const onToggle = () => {
        isModeLogin ? setModeAuth('registration') : setModeAuth('login')
    }

    return (
        <div className={s.login}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={s.form}>
                        <InputStyled name='email' options={{required: {value: true, message: 'Обязательное поле'}}}
                                     label="Email"/>
                        <InputStyled name='password' options={{required: {value: true, message: 'Обязательное поле'}}}
                                     label="Password" type='password'/>
                        {!isModeLogin && <InputStyled name='fullName' options={optionsFillName} label="Полное имя"/>}
                        <Button type='submit'
                                variant='outlined'>{isModeLogin ? 'Авторизоваться' : 'Зарегистрироваться'}</Button>
                        <div>
                            <div>
                                {isModeLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                            </div>
                            <Button onClick={onToggle} type='button'
                                    variant='outlined'> {isModeLogin ? 'Зарегистрироваться' : 'Авторизоваться'}</Button>
                        </div>

                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx: GetServerSidePropsContext) => {
    try {
        if (ctx?.locale) {
            const props = {...(await serverSideTranslations(ctx.locale, ['common']))}
            return {
                props
            };
        }
    } catch (err) {
    }

    return {props: {}};
});

export default AuthPage;
