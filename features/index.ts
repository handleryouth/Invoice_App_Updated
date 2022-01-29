import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./filter";
import { sidebarSlice } from "./sidebar";

export const rootReducer = combineReducers({
  sidebar: sidebarSlice.reducer,
  filter: filterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
