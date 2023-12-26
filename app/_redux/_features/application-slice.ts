import { createSlice } from "@reduxjs/toolkit";

type Application = {
  isAuthenticated: boolean;
};

const initialState: Application = {
  isAuthenticated: true,
};

export const application = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    toggleMerchantDrawer: (state) => {
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
      };
    },
  },
});

export const { toggleMerchantDrawer } = application.actions;

export default application.reducer;
