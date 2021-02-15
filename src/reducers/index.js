import { combineReducers } from "redux";
import { pageReducer } from "./page";
import { userReducer } from "./user";
import { navbarReducer } from "./navbar";

export const rootReducer = combineReducers({
  page: pageReducer,
  user: userReducer,
  navbar: navbarReducer,
});
