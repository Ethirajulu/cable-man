export const SET_AREAS = "SET/AREAS";
export const ADD_AREA = "ADD/AREA";
export const UPDATE_AREA = "UPDATE/AREA";
export const DELETE_AREA = "DELETE/AREA";
export const SET_HOUSES = "SET/HOUSES";
export const ADD_HOUSE = "ADD/HOUSE";
export const UPDATE_HOUSE = "UPDATE/HOUSE";
export const DELETE_HOUSE = "DELETE/HOUSE";
export const SET_SORTED_HOUSES = "SET/SORTED_HOUSES";
export const SET_LOGS = "SET/LOGS";
export const SET_LOADING = "SET/LOADING";

export const PAID_FOR_FORMAT = "MMMM YYYY";
export const PAID_ON_FORMAT = "Do MMMM YYYY";
export const CREATED_FORMAT = "DD-MM-YYYY HH:mm:ss";

export const EMPTY_STRING = "";
export const COMMON_AMOUNT = 220;

export const PAID = "PAID";
export const NOT_PAID = "NOT_PAID";
export const ALL = "ALL";

export const ADD_LABEL = "Add";
export const EDIT_LABEL = "Edit";

export const AREAS_COLLECTION = "areas";
export const HOUSES_COLLECTION = "houses";
export const LOGS_COLLECTION = "logs";
export const SORTED_HOUSES_COLLECTION = "sorted";

export interface House {
  id?: string;
  area_id: string;
  name: string;
  phone_no?: number;
  default_amt: number;
  box_no?: string;
  last_paid?: string;
  payment_id?: string;
  created_on?: string;
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
  paid_for: string;
  paid_on: string;
}

export interface Sorted {
  id?: string;
  area_id: string;
  house_ids: string[];
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

interface SetSortedHousesAction {
  type: typeof SET_SORTED_HOUSES;
  sorted: Sorted;
}

interface SetLoadingStatusAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface SetLogsAction {
  type: typeof SET_LOGS;
  logs: Log[];
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
  | DeleteHouseAction
  | SetSortedHousesAction
  | SetLogsAction;

export type CommonActionTypes = SetLoadingStatusAction;
