import { RootState } from "./store";

export const getAreasSl = (state: RootState) => state.areaReducer.areas;

export const getHousesSl = (state: RootState) => state.houseReducer.houses;

export const getSortedHousesSl = (state: RootState) =>
  state.houseReducer.sorted;

export const getLogsSl = (state: RootState) => state.houseReducer.logs;

export const getLoadingSl = (state: RootState) => state.commonReducer.loading;
