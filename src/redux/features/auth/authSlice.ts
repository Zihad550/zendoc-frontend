import { UserRole } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface IAuthUser {
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface IAuthState {
  user: null | IAuthUser;
  token: null | string;
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!user;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logout, setUser, setCredentials } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
