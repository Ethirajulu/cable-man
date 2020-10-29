import {
  ADD_AREA,
  ADD_HOUSE,
  Area,
  CollectorActionTypes,
  House,
  SET_AREAS,
  SET_HOUSES,
} from "./types";

export const setAreas = (areas: Area[]): CollectorActionTypes => ({
  type: SET_AREAS,
  areas,
});

export const addArea = (area: Area): CollectorActionTypes => ({
  type: ADD_AREA,
  area,
});

export const setHouses = (houses: House[]): CollectorActionTypes => ({
  type: SET_HOUSES,
  houses,
});

export const addHouse = (house: House): CollectorActionTypes => ({
  type: ADD_HOUSE,
  house,
});
