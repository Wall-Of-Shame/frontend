import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import RootReducer from "../reducers/RootReducer";

const persistConfig = {
  key: "wall-of-shame-frontend",
  storage,
};

// To support the persisting of redux across sessions
const persistedReducer = persistReducer(persistConfig, RootReducer);

// Creation of custom middleware, needed for redux persist
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// Creation of redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);

// Settings to aid development
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (module as any).hot?.accept("../reducers/RootReducer", () => {
    // eslint-disable-next-line global-require
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require("../reducers/RootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
