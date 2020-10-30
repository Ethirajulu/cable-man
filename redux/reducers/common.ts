import { AnyAction } from "redux";
import { CommonActionTypes, SET_LOADING } from "../types";

interface State {
  loading: boolean;
}

export const commonReducer = (
  state: State = {
    loading: false,
  },
  action: CommonActionTypes & AnyAction
): State => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
