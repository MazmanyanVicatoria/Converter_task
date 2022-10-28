import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import {
  getLatestRates,
  LatestRatesData,
  getRatesByDate,
} from "../reducers/latestRates";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Directions, initialCurrencies } from "../utils";

const sortTableData = (array: string[], direction: Directions) => {
  return array.sort((a, b) => {
    if (a < b) return direction === Directions.ASCENDING ? -1 : 1;
    if (a > b) return direction === Directions.ASCENDING ? 1 : -1;
    return 0;
  });
};

export const RatesTable = () => {
  const [currency, setCurrency] = useState<string>("USD");
  const [currencies, setCurrencies] = useState<string[]>(initialCurrencies);
  const [direction, setDirection] = useState<Directions>(Directions.DESCENDING);
  const [date, setDate] = useState<number>(Date.now());

  const dispatch = useAppDispatch();
  const rates = useAppSelector(
    (state: RootState) => state.rates as LatestRatesData
  );

  useEffect(() => {
    if (Object.keys(rates).length === 0) {
      //@ts-ignore
      dispatch(getLatestRates());
    }
  }, [rates, dispatch]);

  useEffect(() => {
    //@ts-ignore
    dispatch(getLatestRates(currency));
  }, [currency, dispatch]);

  useEffect(() => {
    setCurrencies(sortTableData(currencies, direction));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const dateChangeHandler = useCallback(
    (newDate: number | null) => {
      if (newDate) {
        setDate(newDate);
        const dated = new Date(newDate);
        const day = dated.getUTCDate();
        const month = dated.getUTCMonth() + 1; //months from 1-12
        const year = dated.getUTCFullYear();

        dispatch(
          //@ts-ignore
          getRatesByDate(
            `${year}-${month < 10 ? "0" + month : month}-${
              day < 10 ? "0" + day : day
            }`
          )
        );
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ marginTop: "80px" }}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={dateChangeHandler}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <FormControl
          variant="standard"
          sx={{ width: "250px", margin: "10px 0" }}
        >
          <InputLabel id="select-to-label">Currency</InputLabel>
          <Select
            labelId="select-to-label"
            id="select-to"
            value={currency}
            label="Age"
            onChange={(e: SelectChangeEvent) => {
              setCurrency(e.target.value as string);
            }}
          >
            {initialCurrencies.map((curr) => (
              <MenuItem key={curr} value={curr}>
                {curr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ margin: "10px 0" }}
          onClick={() =>
            setDirection(
              direction === Directions.DESCENDING
                ? Directions.ASCENDING
                : Directions.DESCENDING
            )
          }
        >
          Sort by name
        </Button>
      </Box>

      <div style={{ height: "150px", width: "fit-content", overflow: "auto" }}>
        <table
          id="currencyTable"
          style={{ border: "1px solid black", position: "relative" }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              fontWeight: "bold",
            }}
          >
            <tr>
              <td style={{ border: "1px solid black" }}>Currency</td>
              <td style={{ border: "1px solid black" }}>Rate</td>
            </tr>
          </thead>
          <tbody>
            {currencies.map((cur: string, i: number) => (
              <tr key={cur} onClick={() => setCurrency(currencies[i])}>
                <td style={{ border: "1px solid black", width: "150px" }}>
                  {cur}
                </td>
                <td style={{ border: "1px solid black", width: "150px" }}>
                  {rates.rates?.[cur]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};
