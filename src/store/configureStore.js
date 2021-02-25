import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { loadState, saveState } from "./sessionStorage";

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.subscribe(() => {
  saveState(store.getState());
});
