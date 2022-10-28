import React, { useCallback } from "react";
import { useAppDispatch } from "../hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ConvertedData, getConvert } from "../reducers/convert";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";

export const Converter = () => {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const dispatch: AppDispatch = useAppDispatch();

  const converted = useSelector(
    (state: RootState) => state.convert as ConvertedData
  );

  const handleConvert = useCallback(
    () =>
      // @ts-ignore
      dispatch(getConvert(to, from, amount)),
    [amount, dispatch, from, to]
  );

  return (
    <>
      <Box>
        <FormControl
          variant="standard"
          sx={{ width: "250px", marginRight: "10px" }}
        >
          <InputLabel id="select-from-label">Currency From</InputLabel>
          <Select
            labelId="select-from-label"
            id="select-from"
            value={from}
            label="Age"
            onChange={(e: SelectChangeEvent) =>
              setFrom(e.target.value as string)
            }
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"RUB"}>RUB</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ width: "250px" }}>
          <InputLabel id="select-to-label">Currency To</InputLabel>
          <Select
            labelId="select-to-label"
            id="select-to"
            value={to}
            label="Age"
            onChange={(e: SelectChangeEvent) => setTo(e.target.value as string)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"RUB"}>RUB</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          height: "65px",
          marginTop: "25px",
          display: "flex",
          gap: "10px",
        }}
      >
        <TextField
          label="Amount"
          variant="standard"
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value as string)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          sx={{ marginRight: "42px" }}
        />
        {converted?.result && <p>RESULT: {converted?.result}</p>}
      </Box>
      <Button
        variant="contained"
        sx={{ width: "120px", marginTop: "10px" }}
        onClick={handleConvert}
      >
        CONVERT
      </Button>
    </>
  );
};
