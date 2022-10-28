import axios from "axios";
import { initialCurrencies } from "../utils";

const instance = axios.create({
  baseURL: "https://api.apilayer.com/exchangerates_data/",
  headers: { apiKey: "Rhw5USDtp3ADos937e3xU8HNkSnh272I" },
});

export const convertAPI = {
  getConvert(to: string, from: string, amount: string) {
    return instance.get(`convert?to=${to}&from=${from}&amount=${amount}`);
  },
};

export const latestCurseAPI = {
  getLatestRates(symbols?: string[], base?: string) {
    return instance.get(
      `latest?symbols=${symbols ? symbols : initialCurrencies}&base=${
        base ? base : "USD"
      }`
    );
  },
};

export const ratesByDateAPI = {
  getRatesByDate(date: string, symbols?: string[], base?: string) {
    return instance.get(
      `${date}?symbols=${symbols ? symbols : initialCurrencies}&base=${
        base ? base : "USD"
      }`
    );
  },
};
