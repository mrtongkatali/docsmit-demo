import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithResponse } from "@/app/_utils/restClient";
import { RootState } from "../store";

export type CreateMessagePayload = {
  title: string;
  address: string;
  file: File | null;
};

export type Message = {
  messageId: number;
};

export type InitialState = {
  data: {
    messages: Message | Message[];
  };
  loading: boolean;
  messageUploading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: {
    messages: {} as Message,
  },
  loading: false,
  messageUploading: false,
  error: null,
};

export const testCreateMessages = createAsyncThunk(
  "auth/testCreateMessages",
  async (
    payload: CreateMessagePayload,
    { dispatch, getState }: { dispatch: any; getState: () => RootState } // TODO: to fix TS error
  ) => {
    try {
      const state = getState();
      const { token } = state.auth.data.user;

      const response = await fetchWithResponse(
        "/api/docsmit/message/new",
        "POST",
        {
          token,
          ...payload,
        }
      );
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const message = createSlice({
  name: "user",
  initialState,
  reducers: {
    //   setUser: (state, action: PayloadAction<Message>) => {
    //     state.data.messages = action.payload;
    //   },
  },
  extraReducers: (builder) => {
    builder.addCase(testCreateMessages.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(testCreateMessages.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(testCreateMessages.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default message.reducer;
// export const { setUser } = message.actions;
