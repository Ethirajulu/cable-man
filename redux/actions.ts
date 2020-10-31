import {
  ADD_AREA,
  ADD_HOUSE,
  Area,
  AreaActionTypes,
  CommonActionTypes,
  DELETE_AREA,
  DELETE_HOUSE,
  House,
  HouseActionTypes,
  Log,
  SET_AREAS,
  SET_HOUSES,
  SET_LOADING,
  SET_LOGS,
  UPDATE_AREA,
  UPDATE_HOUSE,
} from "./types";

export const setAreas = (areas: Area[]): AreaActionTypes => ({
  type: SET_AREAS,
  areas,
});

export const addArea = (area: Area): AreaActionTypes => ({
  type: ADD_AREA,
  area,
});

export const updateArea = (area: Area): AreaActionTypes => ({
  type: UPDATE_AREA,
  area,
});

export const deleteArea = (id: string): AreaActionTypes => ({
  type: DELETE_AREA,
  id,
});

export const setHouses = (houses: House[]): HouseActionTypes => ({
  type: SET_HOUSES,
  houses,
});

export const addHouse = (house: House): HouseActionTypes => ({
  type: ADD_HOUSE,
  house,
});

export const updateHouse = (house: House): HouseActionTypes => ({
  type: UPDATE_HOUSE,
  house,
});

export const deleteHouse = (id: string): HouseActionTypes => ({
  type: DELETE_HOUSE,
  id,
});

export const setLogs = (logs: Log[]): HouseActionTypes => ({
  type: SET_LOGS,
  logs,
});

export const setLoading = (loading: boolean): CommonActionTypes => ({
  type: SET_LOADING,
  loading,
});
