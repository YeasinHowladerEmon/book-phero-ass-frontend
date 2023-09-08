import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import persistedAuthReducer from "./features/auth/authSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    auth: persistedAuthReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
