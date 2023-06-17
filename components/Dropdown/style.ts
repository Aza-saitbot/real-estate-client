import {makeStyles} from "@material-ui/styles";


export const useStylesDropdown = makeStyles({
    root: {
        border: 'none !important',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fonWeight: 400,
        fontSize: 14,
        color: '#333333',
        height: 36,

        '&.MuiOutlinedInput-root': {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fonWeight: 400,
            fontSize: 14,
            color: '#333333',
            height: 36,
            borderRadius: 6,
            width: 336,
            background: '#F4F9FF',
            boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '3px solid #8BACFF !important',
        },

    },

    menu: {
        borderRadius: 6,
        boxShadow: 'none !important',
        padding: '0 5px',
        backgroundColor: '#F4F9FF !important',
        width: 336,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        background: '#F4F9FF',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fonWeight: 400,
        fontSize: 14,
        color: '#333333',
        maxHeight: 270,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    select: {

        '&.MuiMenuItem-root': {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fonWeight: 400,
            fontSize: 14,
            position: 'relative',
            boxSizing: 'border-box',
            width: 'auto',
            maxWidth: '100%',

            '&::after': {
                content: '" "',
                position: 'absolute',
                height: 16,
                width: 32,
                right: 0,
                top: 8,
                bottom: 8,
                background: 'linear-gradient(90deg, rgba(244, 249, 255, 0) 0%, rgba(244, 249, 255, 0.0086472) 6.67%, rgba(244, 249, 255, 0.03551) 13.33%, rgba(244, 249, 255, 0.0816599) 20%, rgba(244, 249, 255, 0.147411) 26.67%, rgba(244, 249, 255, 0.231775) 33.33%, rgba(244, 249, 255, 0.331884) 40%, rgba(244, 249, 255, 0.442691) 46.67%, rgba(244, 249, 255, 0.557309) 53.33%, rgba(244, 249, 255, 0.668116) 60%, rgba(244, 249, 255, 0.768225) 66.67%, rgba(244, 249, 255, 0.852589) 73.33%, rgba(244, 249, 255, 0.91834) 80%, rgba(244, 249, 255, 0.96449) 86.67%, rgba(244, 249, 255, 0.991353) 93.33%, #F4F9FF 100%)',

            },


            '&:hover': {
                background: '#FFE1CC',
                borderRadius: 6,
                position: 'relative',


                '&::after': {
                    content: '" "',
                    position: 'absolute',
                    height: 16,
                    width: 32,
                    right: 0,
                    top: 8,
                    bottom: 8,
                    background: 'linear-gradient(90deg, rgba(255, 225, 204, 0) 0%, rgba(255, 225, 204, 0.0086472) 6.67%, rgba(255, 225, 204, 0.03551) 13.33%, rgba(255, 225, 204, 0.0816599) 20%, rgba(255, 225, 204, 0.147411) 26.67%, rgba(255, 225, 204, 0.231775) 33.33%, rgba(255, 225, 204, 0.331884) 40%, rgba(255, 225, 204, 0.442691) 46.67%, rgba(255, 225, 204, 0.557309) 53.33%, rgba(255, 225, 204, 0.668116) 60%, rgba(255, 225, 204, 0.768225) 66.67%, rgba(255, 225, 204, 0.852589) 73.33%, rgba(255, 225, 204, 0.91834) 80%, rgba(255, 225, 204, 0.96449) 86.67%, rgba(255, 225, 204, 0.991353) 93.33%, #FFE1CC 100%)',
                },
            },
        },

        '&.MuiMenuItem-root.Mui-selected': {
            backgroundColor: '#FFE1CC !important',
            borderRadius: 6,

            '&::after': {
                content: '" "',
                position: 'absolute',
                height: 16,
                width: 32,
                right: 0,
                top: 8,
                bottom: 8,
                background: 'linear-gradient(90deg, rgba(255, 225, 204, 0) 0%, rgba(255, 225, 204, 0.0086472) 6.67%, rgba(255, 225, 204, 0.03551) 13.33%, rgba(255, 225, 204, 0.0816599) 20%, rgba(255, 225, 204, 0.147411) 26.67%, rgba(255, 225, 204, 0.231775) 33.33%, rgba(255, 225, 204, 0.331884) 40%, rgba(255, 225, 204, 0.442691) 46.67%, rgba(255, 225, 204, 0.557309) 53.33%, rgba(255, 225, 204, 0.668116) 60%, rgba(255, 225, 204, 0.768225) 66.67%, rgba(255, 225, 204, 0.852589) 73.33%, rgba(255, 225, 204, 0.91834) 80%, rgba(255, 225, 204, 0.96449) 86.67%, rgba(255, 225, 204, 0.991353) 93.33%, #FFE1CC 100%)',
            },


            '&.MuiMenuItem-root.Mui-selected:hover': {
                backgroundColor: '#FFE1CC',
            },
        },


    },

    focused: {
        border: '3px solid #8BACFF',
    },
    iconStyle: {
        position: 'absolute',
        marginTop: -3,
        right: 10,
        height: 20,
        width: 20,
        color: '#c0c0c0',
        pointerEvents: 'none',
    },
});