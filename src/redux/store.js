import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import photoReducer from "./ImagesRedux/reducer.js";

import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  photos: photoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
