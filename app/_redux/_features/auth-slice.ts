import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWithResponse } from "@/app/_utils/restClient"

type User = {
  userID: number
  token: string
  name: string
  email: string
  attachmentFilesMaxLimit: number
  creditBalance: number
}

type Auth = {
  data: {
    user: User
  }
  loading: boolean
  error: string | null
}

const initialState: Auth = {
  data: {
    user: {} as User,
  },
  loading: false,
  error: null,
}


// Actions
export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, { dispatch }) => {
    try {
      const response = await fetchWithResponse('/api/docsmit/auth')
      dispatch(setUser(response))

    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
)

// Reducers
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      // console.log("authenticatedUser.loading - ")
      state.loading = true
    })

    builder.addCase(getToken.fulfilled, (state, _) => {
      // console.log("authenticatedUser.fullfilled - ", action.payload)
      // state.data.accessToken = action.payload.accessToken
      state.loading = false
    })

    builder.addCase(getToken.rejected, (state, _) => {
      state.loading = false
    })
  },
})

export default user.reducer
export const { setUser } = user.actions
