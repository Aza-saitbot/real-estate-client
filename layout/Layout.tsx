import Head from "next/head";
import {Header} from "@/components/Header";
import React, {createContext, useCallback, useState} from "react";
import styles from "@/styles/Home.module.scss";
import Alert, {AlertType} from "@/components/Alert/Alert";
import {IUser} from "@/api/dto/auth.dto";


interface LayoutContextProps {
    setAlert: (data: AlertType | null) => void
    alertData: AlertType | null
    images: Array<string>
    setImages: (images: Array<string>) => void
}

export const LayoutContext = createContext<LayoutContextProps | null>(null);

interface LayoutProps {
    title: string;
    children: React.ReactNode;
    user?: IUser
}

export const Layout: React.FC<LayoutProps> = ({title,user, children}) => {
    const [alertData, setAlertData] = useState<AlertType | null>(null);
    const [images,setImagesData]=useState<Array<string>>([])

    const setAlert = useCallback((data: AlertType | null) => {
        setAlertData(data);
    }, []);

    const setImages = useCallback((images: Array<string>) => {
        setImagesData(images)
    },[])

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main >
                <LayoutContext.Provider value={{setAlert, alertData,images,setImages}}>
                        <Alert/>
                        <div className={styles.main}>
                            <Header user={user} />
                            <div className={styles.content}>
                                {children}
                            </div>
                        </div>
                </LayoutContext.Provider>
            </main>
        </>
    );
};


