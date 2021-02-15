import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
