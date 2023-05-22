import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    obj: null,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      action.payload.token &&
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.obj = action.payload;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      localStorage.clear();
      state.obj = null;
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
