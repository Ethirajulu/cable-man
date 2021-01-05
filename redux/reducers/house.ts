import { AnyAction } from "redux";
import {
  ADD_HOUSE,
  DELETE_HOUSE,
  House,
  HouseActionTypes,
  Log,
  SET_HOUSES,
  SET_LOGS,
  SET_SORTED_HOUSES,
  Sorted,
  UPDATE_HOUSE,
} from "../types";

interface State {
  houses: House[];
  sorted: Sorted;
  logs: Log[];
}

export const houseReducer = (
  state: State = {
    houses: [],
    sorted: { id: "", area_id: "", house_ids: [] },
    logs: [],
  },
  action: HouseActionTypes & AnyAction
): State => {
  let updatedHouses = [];
  switch (action.type) {
    case SET_HOUSES:
      return { ...state, houses: action.houses };
    case ADD_HOUSE:
      return { ...state, houses: [...state.houses, action.house] };
    case UPDATE_HOUSE:
      updatedHouses = state.houses.filter(
        (house) => house.id !== action.house.id
      );
      updatedHouses.push(action.house);
      return { ...state, houses: updatedHouses };
    case DELETE_HOUSE:
      updatedHouses = state.houses.filter((house) => house.id !== action.id);
      return { ...state, houses: updatedHouses };
    case SET_SORTED_HOUSES:
      return { ...state, sorted: action.sorted };
    case SET_LOGS:
      return { ...state, logs: action.logs };
    default:
      return state;
  }
};
