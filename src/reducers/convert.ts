import { convertAPI } from "../api";
import { AppDispatch } from "../store/index.js";

const SET_COVNERT = "CONVERT/SET_COVNERT";
const initialState = {
  date: "",
  historical: "string",
  info: {
    rate: null,
    timestamp: null,
  },
  query: {
    to: "",
    from: "",
    amount: "",
  },
  result: null,
};

interface Convert {
  to: string;
  from: string;
  amount: string;
}

export interface ConvertedData {
  date: string;
  historical: string;
  info: {
    rate: number;
    timestamp: number;
  };
  query: Convert;
  result: number | null;
  success: boolean;
}

interface ConvertActionType {
  type: string;
  payload: ConvertedData;
}

export const convertReducer = (
  state = initialState,
  action: ConvertActionType
) => {
  switch (action.type) {
    case SET_COVNERT:
      return action.payload;
    default:
      return state;
  }
};

const setConvertedData = (convertedData: ConvertedData) => ({
  type: SET_COVNERT,
  payload: convertedData,
});

export const getConvert =
  (to: string, from: string, amount: string) =>
  async (dispatch: AppDispatch) => {
    const data = await convertAPI
      .getConvert(to, from, amount)
      .then((res) => res.data);
    dispatch(setConvertedData(data));
  };
