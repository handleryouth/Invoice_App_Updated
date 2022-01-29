import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const emptyFilter: string[] = [];

export const filterSlice = createSlice({
  name: "filter",
  initialState: emptyFilter,
  reducers: {
    handleChangeFilter: (state: string[], action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    handleRemoveFilter: (state: string[], action: PayloadAction<string>) => {
      return state.filter((item) => item !== action.payload);
    },
  },
});

export const { handleChangeFilter, handleRemoveFilter } = filterSlice.actions;
