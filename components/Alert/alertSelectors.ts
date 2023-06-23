import {RootState} from "@/redux/types";

export const alertsSelector = (state: RootState) => state.alerts.alerts;
export const alertWithClosingSelector = (state: RootState) => state.alerts.alertWithClosing;
export const alertTextWithLinkSelector = (state: RootState) => state.alerts.textWithLink