export const SET_AREAS = "SET/AREAS";
export const ADD_AREA = "ADD/AREA";
export const SET_HOUSES = "SET/HOUSES";
export const ADD_HOUSE = "ADD/HOUSE";

export interface House {
  id: string;
  area_id: string;
  name: string;
  default_amt: number;
  box_no: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Log {
  id: string;
  area_name: string;
  house_name: string;
  box_no: string;
  paid_amt: number;
  created_on: Date;
}

interface SetAreasAction {
  type: typeof SET_AREAS;
  areas: Area[];
}

interface AddAreaAction {
  type: typeof ADD_AREA;
  area: Area;
}

interface SetHousesAction {
  type: typeof SET_HOUSES;
  houses: House[];
}

interface AddHouseAction {
  type: typeof ADD_HOUSE;
  house: House;
}

export type CollectorActionTypes =
  | SetAreasAction
  | AddAreaAction
  | SetHousesAction
  | AddHouseAction;
