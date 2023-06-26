import React from 'react';
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import {styleModal} from "@/components/ModalStyled/lib/style";

type ModalProps = {
    open: boolean;
    onChangeStateOpen: () => void;
    children?: React.ReactNode;
}
const ModalStyled = ({open, onChangeStateOpen, children}: ModalProps) =>
    <Modal open={open} onClose={onChangeStateOpen}><Box sx={styleModal}>{children}</Box></Modal>

export default ModalStyled;