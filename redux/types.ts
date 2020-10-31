export const SET_AREAS = "SET/AREAS";
export const ADD_AREA = "ADD/AREA";
export const UPDATE_AREA = "UPDATE/AREA";
export const DELETE_AREA = "DELETE/AREA";
export const SET_HOUSES = "SET/HOUSES";
export const ADD_HOUSE = "ADD/HOUSE";
export const UPDATE_HOUSE = "UPDATE/HOUSE";
export const DELETE_HOUSE = "DELETE/HOUSE";
export const SET_LOADING = "SET/LOADING";

export interface House {
  id?: string;
  area_id: string;
  name: string;
  default_amt: number;
  box_no: string;
  last_paid?: string;
}

export interface Area {
  id?: string;
  name: string;
}

export interface Log {
  id?: string;
  area_name: string;
  house_id: string;
  house_name: string;
  box_no: string;
  paid_amt: number;
  created_on: string;
}

interface SetAreasAction {
  type: typeof SET_AREAS;
  areas: Area[];
}

interface AddAreaAction {
  type: typeof ADD_AREA;
  area: Area;
}

interface UpdateAreaAction {
  type: typeof UPDATE_AREA;
  area: Area;
}

interface DeleteAreaAction {
  type: typeof DELETE_AREA;
  id: string;
}

interface SetHousesAction {
  type: typeof SET_HOUSES;
  houses: House[];
}

interface AddHouseAction {
  type: typeof ADD_HOUSE;
  house: House;
}

interface UpdateHouseAction {
  type: typeof UPDATE_HOUSE;
  house: House;
}

interface DeleteHouseAction {
  type: typeof DELETE_HOUSE;
  id: string;
}

interface SetLoadingStatusAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

export type AreaActionTypes =
  | SetAreasAction
  | AddAreaAction
  | UpdateAreaAction
  | DeleteAreaAction;

export type HouseActionTypes =
  | SetHousesAction
  | AddHouseAction
  | UpdateHouseAction
  | DeleteHouseAction;

export type CommonActionTypes = SetLoadingStatusAction;
