import { AnyAction } from "redux";
import {
  ADD_AREA,
  Area,
  AreaActionTypes,
  DELETE_AREA,
  SET_AREAS,
  UPDATE_AREA,
} from "../types";

interface State {
  areas: Area[];
}

export const areaReducer = (
  state: State = {
    areas: [],
  },
  action: AreaActionTypes & AnyAction
): State => {
  let updatedAreas = [];
  switch (action.type) {
    case SET_AREAS:
      return { ...state, areas: action.areas };
    case ADD_AREA:
      return { ...state, areas: [...state.areas, action.area] };
    case UPDATE_AREA:
      updatedAreas = state.areas.filter((area) => area.id !== action.area.id);
      updatedAreas.push(action.area);
      return { ...state, areas: updatedAreas };
    case DELETE_AREA:
      updatedAreas = state.areas.filter((area) => area.id !== action.id);
      return { ...state, areas: updatedAreas };
    default:
      return state;
  }
};
