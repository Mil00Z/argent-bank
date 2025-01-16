import { combineSlices, configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/query"

import { authSlice } from "./auth/slice"
import { authApi } from "./auth/api"

import { userSlice } from "./user/slice"
import { userApi } from "./user/api"


// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)

export const store = configureStore({
  // reducer: combineSlices(authSlice, userSlice),
  reducer: combineSlices(),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: getDefaultMiddleware => {
  //   return getDefaultMiddleware().concat(authApi.middleware,userApi.middleware)
  // }
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(authApi.middleware)
  }

})





