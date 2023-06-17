import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {authThunk} from "@/entities/user/model/userReducer";
import {createApartment, getOneApartment, uploadImages} from "@/entities/apartment/model";

export type AlertType = {
  code?: number;
  identificator: string | number;
  payload?: string;
  color?: string;
};

type PayloadTitled = {
  title: string;
  text: string;
}

export type AlertWithClosingType = {
  code?: number;
  payload?: string | PayloadTitled;
  color?: string;
};

export type AlertTextWithLinkPayloadType = {
  text:string
  linkKeyword:string
  linkPath:string
}
export type AlertTextWithLinkType = {
  code?: number;
  payload: AlertTextWithLinkPayloadType
  color?: string;
};

export type AlertsModelType = {
  alerts: AlertType[];
  alertWithClosing: null | AlertWithClosingType
  textWithLink: null | AlertTextWithLinkType
};

const initialState: AlertsModelType = {
  alerts: [],
  alertWithClosing: null,
  textWithLink: null
};

const generateId = () => nanoid();

const alertModel = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    removeAlert: (state, action: PayloadAction<AlertType>) => {
      const alertIndex = state.alerts.findIndex((alert) => alert.identificator === action.payload.identificator);
      if (alertIndex !== -1) {
        state.alerts.splice(alertIndex, 1);
      }
    },
    addAlertWithCustomText: (state, action: PayloadAction<{ message: string; color?: string }>) => {
      state.alerts.push({ payload: action.payload.message, color: action.payload.color, identificator: generateId() });
    },
    setAlertWithClosing: (state, action: PayloadAction<null|AlertWithClosingType>) => {
      state.alertWithClosing=action.payload
    },
    setAlertTextWithLink: (state, action: PayloadAction<null | AlertTextWithLinkType>) => {
      state.textWithLink = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.rejected, (state, action) => {
        state.alerts.push({
          code: action.payload!,
          identificator: generateId(),
        });
      })
        .addCase(getOneApartment.rejected, (state, action) => {
          state.alerts.push({
            code: action.payload!,
            identificator: generateId(),
          });
        })
        .addCase(createApartment.rejected, (state, action) => {
          state.alerts.push({
            code: action.payload!,
            identificator: generateId(),
          });
        })
        .addCase(uploadImages.rejected, (state, action) => {
          state.alerts.push({
            code: action.payload!,
            identificator: generateId(),
          });
        })
  },
});

export const { removeAlert, addAlertWithCustomText, setAlertWithClosing, setAlertTextWithLink } = alertModel.actions;

export const alertReducer = alertModel.reducer;
