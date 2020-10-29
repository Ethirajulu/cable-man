import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { collector } from "./reducer";
import { CollectorActionTypes } from "./types";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  collector: collector,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore, { debug: true });
