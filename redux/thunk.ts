import { message } from "antd";
import { db } from "../config/fire-config";
import {
  addArea,
  deleteArea,
  setAreas,
  setLoading,
  updateArea,
} from "./actions";
import { AppThunk } from "./store";
import { Area } from "./types";

export const getAreasThunk = (): AppThunk => async (dispatch) => {
  try {
    const docs = (await db.collection("areas").get()).docs;
    let areas: Area[] = [];
    let area: Area;
    docs.forEach((doc) => {
      area = { id: doc.id, name: doc.data().name };
      areas.push(area);
    });
    dispatch(setAreas(areas));
  } catch (err) {
    message.error("Listing areas failed");
    dispatch(setLoading(false));
  }
};

export const addAreaThunk = (name: string): AppThunk => async (dispatch) => {
  try {
    const docs = await db.collection("areas").add({ name });
    dispatch(
      addArea({
        id: docs.id,
        name,
      })
    );
    message.success("Area successfully added");
  } catch (err) {
    message.error("Adding area failed");
    dispatch(setLoading(false));
  }
};

export const updateAreaThunk = (id: string, name: string): AppThunk => async (
  dispatch
) => {
  try {
    await db.collection("areas").doc(id).set({ name });
    dispatch(updateArea({ id, name }));
    message.success("Area updated successfully");
  } catch (err) {
    message.error("Updating area failed");
    dispatch(setLoading(false));
  }
};

export const deleteAreaThunk = (id: string): AppThunk => async (dispatch) => {
  try {
    await db.collection("areas").doc(id).delete();
    dispatch(deleteArea(id));
    message.success("Area deleted successfully");
  } catch (err) {
    console.log("err: ", err);
    message.error("Deleting area failed");
    dispatch(setLoading(false));
  }
};
