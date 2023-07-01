import Head from "next/head";
import {Header} from "@/components/Header";
import React, {createContext, useCallback, useState} from "react";
import styles from "@/styles/Home.module.scss";
import Alert, {AlertType} from "@/components/Alert/Alert";
import ApartmentsList from "@/modules/apartments/ApartmentsList";
import {IUser} from "@/api/dto/auth.dto";


interface LayoutContextProps {
    setAlert: (data: AlertType | null) => void
    alertData: AlertType | null
    setUser: (user: IUser | null) => void
    user: IUser | null
}

export const LayoutContext = createContext<LayoutContextProps | null>(null);

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({title, children}) => {
    const [alertData, setAlertData] = useState<AlertType | null>(null);
    const [user,setUserData] = useState<IUser | null>(null)
console.log('user',user)
    const setAlert = useCallback((data: AlertType | null) => {
        setAlertData(data);
    }, []);

    const setUser = useCallback((user: IUser | null) => {
        setUserData(user)
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main >
                <LayoutContext.Provider value={{setAlert, alertData,setUser,user}}>
                        <Alert/>
                        <div className={styles.main}>
                            <Header />
                            <div className={styles.content}>
                                {children}
                            </div>
                        </div>
                </LayoutContext.Provider>
            </main>
        </>
    );
};


