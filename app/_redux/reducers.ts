import { combineReducers } from "redux";
import applicationSlice from "./_features/application-slice";
import authSlice from "./_features/auth-slice";

const rootReducer = combineReducers({
  application: applicationSlice,
  auth: authSlice,
});

export default rootReducer;
