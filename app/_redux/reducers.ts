import { combineReducers } from "redux";
import applicationSlice from "./_features/applicationSlice";
import authSlice from "./_features/authSlice";
import messageSlice from "./_features/messageSlice";

const rootReducer = combineReducers({
  application: applicationSlice,
  auth: authSlice,
  message: messageSlice,
});

export default rootReducer;
