import { latestCurseAPI, ratesByDateAPI } from "../api";
import { AppDispatch } from "../store/index.js";

const LATEST_RATES = "LATEST_RATES/SET_LATEST_RATES";
const initialState = {
  base: "",
  date: "",
  rates: {},
  timestamp: "",
};

export interface LatestRatesData {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
  timestamp: number | null;
  success: boolean;
}

interface LatestratesActionType {
  type: string;
  payload: LatestRatesData;
}

export const latestRates = (
  state = initialState,
  action: LatestratesActionType
) => {
  switch (action.type) {
    case LATEST_RATES:
      return action.payload;
    default:
      return state;
  }
};

const setLatestRatesData = (latestRatesData: LatestRatesData) => ({
  type: LATEST_RATES,
  payload: latestRatesData,
});

export const getLatestRates =
  (base?: string, symbols?: string[]) => async (dispatch: AppDispatch) => {
    const data = await latestCurseAPI
      .getLatestRates(symbols, base)
      .then((res) => res.data);
    dispatch(setLatestRatesData(data));
  };

export const getRatesByDate =
  (date: string, symbols?: string[], base?: string) =>
  async (dispatch: AppDispatch) => {
    const data = await ratesByDateAPI
      .getRatesByDate(date, symbols, base)
      .then((res) => res.data);
    dispatch(setLatestRatesData(data));
  };
