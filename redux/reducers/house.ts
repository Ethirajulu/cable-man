import { AnyAction } from "redux";
import {
  ADD_HOUSE,
  DELETE_HOUSE,
  House,
  HouseActionTypes,
  SET_HOUSES,
  UPDATE_HOUSE,
} from "../types";

interface State {
  houses: House[];
}

export const houseReducer = (
  state: State = {
    houses: [],
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
      updatedHouses.push(action.area);
      return { ...state, houses: updatedHouses };
    case DELETE_HOUSE:
      updatedHouses = state.houses.filter((house) => house.id !== action.id);
      return { ...state, houses: updatedHouses };
    default:
      return state;
  }
};
