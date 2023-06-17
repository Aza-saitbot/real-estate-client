import React from 'react';
import {Button, Tooltip} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";


type ButtonWrapperProps = {
    children?: React.ReactNode;
    titleTooltip?: string;
} & ButtonProps
export const ButtonWrapper = ({titleTooltip,children,...buttonProps}:ButtonWrapperProps) =>
     <Tooltip placement='top' title={titleTooltip}>
        <Button {...buttonProps} variant='outlined'>
            {children}
        </Button>
    </Tooltip>