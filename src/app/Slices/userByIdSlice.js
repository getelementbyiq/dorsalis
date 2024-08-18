// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userByIdSlice = createSlice({
  name: "userById",
  initialState: {
    user: null, // Hier kannst du die Benutzerdaten speichern
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
  },
});

export const { setUser } = userByIdSlice.actions;

export default userByIdSlice.reducer;
