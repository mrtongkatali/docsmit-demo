import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithResponse } from "@/app/_utils/restClient";
import { RootState } from "../store";

export type CreateMessagePayload = {
  title: string;
  address: string;
  file?: File | null;
};

export type Message = {
  messageId: number;
  title: string;
  totalRecipientsCount: number;
  from: number;
  accepted: Date;
};

export type InitialState = {
  data: {
    messages: Message | Message[];
  };
  loading: boolean;
  isFetchingMessages: boolean;
  isFileLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: {
    messages: {} as Message | Message[],
  },
  loading: false,
  isFileLoading: false,
  isFetchingMessages: false,
  error: null,
};

export const getSentMessages = createAsyncThunk(
  "message/getSentMessages",
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const { token } = state.auth.data.user;

    thunkAPI.dispatch(setMessages([]));

    const response = await fetchWithResponse(
      "/api/docsmit/message/sent",
      "POST",
      { token }
    );

    thunkAPI.dispatch(setMessages(response));
  }
);

export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (payload: CreateMessagePayload, thunkAPI) => {
    try {
      const state: RootState = thunkAPI.getState() as RootState;
      const { token } = state.auth.data.user;

      thunkAPI.dispatch(setFileIsLoading(true));

      const response = await fetchWithResponse(
        "/api/docsmit/message/new",
        "POST",
        {
          token,
          ...payload,
        }
      );

      const messageID = response.data.messageID;

      if (payload.file) {
        const fd = new FormData();
        fd.set("file", payload.file, payload.file.name);
        fd.set("token", token);
        fd.set("messageID", messageID);

        const response = await fetch("/api/docsmit/message/documentUpload", {
          method: "POST",
          body: fd,
        });

        // @TODO: To handle axios error elegantly
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
      }

      const sendResponse = await fetchWithResponse(
        "/api/docsmit/message/send",
        "POST",
        {
          token,
          messageID,
        }
      );

      thunkAPI.dispatch(setFileIsLoading(false));
      thunkAPI.dispatch(setError(""));

      alert(
        `${sendResponse.data.message}. Remaining balance - ${sendResponse.data.creditBalance}`
      );
    } catch (e: any) {
      thunkAPI.dispatch(setError(e.message));
      thunkAPI.dispatch(setFileIsLoading(false));
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const message = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFileIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isFileLoading = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message | []>) => {
      state.data.messages = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
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

    builder.addCase(getSentMessages.pending, (state) => {
      state.isFetchingMessages = true;
    });

    builder.addCase(getSentMessages.fulfilled, (state) => {
      state.isFetchingMessages = false;
    });

    builder.addCase(getSentMessages.rejected, (state) => {
      state.isFetchingMessages = false;
    });
  },
});

export default message.reducer;
export const { setFileIsLoading, setMessages, setError } = message.actions;
