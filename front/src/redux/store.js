import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk'

// import { setupListeners } from "@reduxjs/toolkit/query"

import { authSlice } from "./auth/slice"
import { authApi } from "./auth/api"

import { userSlice } from "./user/slice"
import { userApi } from "./user/api"


let state = {};

export const store = configureStore({
  preloadState: state,
  reducer : combineReducers({
    auth: authSlice.reducer,
    user : userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer
  }),
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(authApi.middleware).concat(thunk)
  }

})





