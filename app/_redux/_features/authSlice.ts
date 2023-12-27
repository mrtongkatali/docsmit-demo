import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithResponse } from "@/app/_utils/restClient";
import { RootState } from "../store";

type User = {
  userID: number;
  token: string;
  name: string;
  email: string;
  attachmentFilesMaxLimit: number;
  creditBalance: number;
};

type Auth = {
  data: {
    user: User;
  };
  loading: boolean;
  error: string | null;
};

const initialState: Auth = {
  data: {
    user: {} as User,
  },
  loading: false,
  error: null,
};

// Actions
export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, { dispatch }) => {
    try {
      const response = await fetchWithResponse("/api/docsmit/auth", "GET");
      dispatch(setUser(response.data));
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteToken = createAsyncThunk(
  "auth/deleteToken",
  async (
    _,
    { dispatch, getState }: { dispatch: any; getState: () => RootState } // TODO: fix TS error
  ) => {
    const state = getState();

    dispatch(clearUser());

    try {
      const response = await fetchWithResponse("/api/docsmit/auth", "DELETE", {
        token: state.auth.data.user.token,
      });
      dispatch(setUser(response.data));
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

// Reducers
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data.user = action.payload;
    },
    clearUser: (state) => {
      state.data.user = initialState.data.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getToken.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(getToken.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default user.reducer;
export const { setUser, clearUser } = user.actions;
