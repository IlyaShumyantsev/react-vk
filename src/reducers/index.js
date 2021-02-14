import { combineReducers } from "redux";
import { photosReducer } from "./photos";
import { userReducer } from "./user";
import { navbarReducer } from "./navbar";

export const rootReducer = combineReducers({
  photos: photosReducer,
  user: userReducer,
  navbar: navbarReducer,
});
