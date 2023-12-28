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
  isFileLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: {
    messages: {} as Message,
  },
  loading: false,
  isFileLoading: false,
  error: null,
};

export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (
    payload: CreateMessagePayload,
    { dispatch, getState, thunkAPI }: { dispatch: any; getState: () => RootState, thunkAPI: any; } // @TODO: to fix TS error
  ) => {
    try {
      const state = getState();
      const { token } = state.auth.data.user;

      dispatch(setFileIsLoading(true));

      const response = await fetchWithResponse(
        "/api/docsmit/message/new",
        "POST",
        {
          token,
          ...payload,
        }
      );

      const messageID = response.data.messageID;

      setTimeout(() => {
        dispatch(setFileIsLoading(false));
      }, 300)

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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

    setFileIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isFileLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createMessage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createMessage.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(createMessage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default message.reducer;
export const { setFileIsLoading } = message.actions;
