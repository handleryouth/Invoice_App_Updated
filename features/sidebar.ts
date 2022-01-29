import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebarTrue: (state) => {
      state.isOpen = true;
    },
    toggleSidebarFalse: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebarFalse, toggleSidebarTrue } = sidebarSlice.actions;
