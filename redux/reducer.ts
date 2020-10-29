import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { AnyAction, createStore } from "redux";
import {
  ADD_AREA,
  ADD_HOUSE,
  Area,
  CollectorActionTypes,
  House,
  SET_AREAS,
  SET_HOUSES,
} from "./types";

export interface State {
  areas: Area[];
  houses: House[];
}

export const collector = (
  state: State = {
    areas: [],
    houses: [],
  },
  action: CollectorActionTypes & AnyAction
): State => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case SET_AREAS:
      return { ...state, areas: action.areas };
    case ADD_AREA:
      return { ...state, areas: [...state.areas, action.area] };
    case SET_HOUSES:
      return { ...state, houses: action.houses };
    case ADD_HOUSE:
      return { ...state, houses: [...state.houses, action.house] };
    default:
      return state;
  }
};
