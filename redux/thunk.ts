import { db } from "../config/fire-config";
import { setAreas } from "./actions";
import { AppThunk } from "./store";
import { Area } from "./types";

export const fetchAreas = (): AppThunk => async (dispatch) => {
  const docs = (await db.collection("areas").get()).docs;
  let areas: Area[] = [];
  let area: Area;
  docs.forEach((doc) => {
    area = { id: doc.id, name: doc.data().name };
    areas.push(area);
  });
  dispatch(setAreas(areas));
};
