// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const recievedDataSlice = createSlice({
  name: "recievedData",
  initialState: null,
  reducers: {
    setData: (state, action) => {
      return action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    deleteData: (state, action) => {
      const index = action.payload;
      // Kopiere den aktuellen Zustand und entferne das Element mit dem angegebenen Index
      return state.filter((_, i) => i !== index);
    },
  },
});

export const { setData, deleteData } = recievedDataSlice.actions;

export default recievedDataSlice.reducer;
