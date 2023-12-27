import { combineReducers } from "redux";
import applicationSlice from "./_features/applicationSlice";
import authSlice from "./_features/authSlice";

const rootReducer = combineReducers({
  application: applicationSlice,
  auth: authSlice,
});

export default rootReducer;
