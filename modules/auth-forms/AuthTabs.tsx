import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {LoginForm} from "@/modules/auth-forms/LoginForm";
import {RegisterForm} from "@/modules/auth-forms/RegisterForm";
import {useTranslation} from "next-i18next";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AuthTabs() {
    const {t, i18n} = useTranslation()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {name: 'Авторизация',Component: LoginForm},
        {name: 'Регистрация',Component: RegisterForm},
    ]

    return (
        <Box >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map(({name,Component}, index) => (
                <TabPanel key={index} value={value} index={index}>
                    <Component/>
                </TabPanel>
            ))}
        </Box>
    );
}