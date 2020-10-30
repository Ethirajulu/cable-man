import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import {
  ADD_AREA,
  ADD_HOUSE,
  Area,
  CollectorActionTypes,
  DELETE_AREA,
  DELETE_HOUSE,
  House,
  SET_AREAS,
  SET_HOUSES,
  SET_LOADING,
  UPDATE_AREA,
  UPDATE_HOUSE,
} from "./types";

export interface State {
  areas: Area[];
  houses: House[];
  loading: boolean;
}

export const collector = (
  state: State = {
    areas: [],
    houses: [],
    loading: false,
  },
  action: CollectorActionTypes & AnyAction
): State => {
  let updatedAreas = [];
  let updatedHouses = [];
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case SET_AREAS:
      return { ...state, areas: action.areas };
    case ADD_AREA:
      return { ...state, areas: [...state.areas, action.area] };
    case UPDATE_AREA:
      updatedAreas = state.areas.filter((area) => area.id !== action.area.id);
      updatedAreas.push(action.area);
      return { ...state, areas: updatedAreas };
    case DELETE_AREA:
      updatedAreas = state.areas.filter((area) => area.id !== action.area.id);
      return { ...state, areas: updatedAreas };
    case SET_HOUSES:
      return { ...state, houses: action.houses };
    case ADD_HOUSE:
      return { ...state, houses: [...state.houses, action.house] };
    case UPDATE_HOUSE:
      updatedHouses = state.houses.filter(
        (house) => house.id !== action.house.id
      );
      updatedHouses.push(action.area);
      return { ...state, houses: updatedHouses };
    case DELETE_HOUSE:
      updatedHouses = state.houses.filter(
        (house) => house.id !== action.house.id
      );
      return { ...state, houses: updatedHouses };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
