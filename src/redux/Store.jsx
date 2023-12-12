// Store.jsx
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./User"; // Make sure the filename matches correctly

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const Store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

const persistor = persistStore(Store);

export { Store, persistor };
