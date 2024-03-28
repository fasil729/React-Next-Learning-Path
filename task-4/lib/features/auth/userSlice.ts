import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        userData: null
    },
    reducers: {
      setUserData(state, action) {
        state.userData = action.payload;
      },
      setUserEmail(state, action) {
        state.email = action.payload

      },
      clearUserData(state) {
        state.userData = null;
      },
      updateProfile(state, action) {
        if (state.userData) {
          state.userData = {...action.payload };
        }
      },
    },
  });
  
  export const { setUserData, setUserEmail, clearUserData, updateProfile } = userSlice.actions;
  export default userSlice.reducer;
