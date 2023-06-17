import React from 'react';
import Box from "@mui/material/Box";
import {styleModal} from "@/shared/ui/ModalStyled/lib/style";
import {Modal} from "@mui/material";


type ModalProps = {
    open: boolean;
    onChangeStateOpen: () => void;
    children?: React.ReactNode;
}
const ModalStyled = ({open,onChangeStateOpen,children}:ModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onChangeStateOpen}

            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalStyled;