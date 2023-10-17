// 1. Index.css = height,width=100%,fontfamily:sans-serif;
// 2. jsconfig.json
// 3. components, scenes and state folders.
// 4. writing the app.js for the react-router setup. - done
// 5. writing the state index.js which will helps to set states and payloads
// 6. index.js lo persist - done
// 7. components - all - done
// 8. scenes and widgets - done
// 9. run single by single according to the scenes like
// register,loginPage,navbar, homepage etc -
// 10. run whole app-

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";


if (process.env.NODE_ENV === "production") disableReactDevTools()

// to configure how and
// where your redux store should be persisted,
// such as localstorage or asyncStorage

// with this the important information like auth status,etc will remains available
// even when the user closes and reopens the application.
const persistConfig = { key: "root", storage, version: 1 };

// so here we are storing  the auth related info using the persistReducer function.
const persistedReducer = persistReducer(persistConfig, authReducer);

// store = it plays major role in managing the state of your application.
// state = it is the plain js object.
// it is read-only.
// cant directly modify it.
// using the dispatch acions we can make changes.

// actions = events or changes in our application

// reducers = pure functions that specify how the state should change in res to actions.
//            it takes current state and an action and return the new state.
//            we can combine multiple reducers to one single reducer using the combineReducers function.

// dispatch = to update the state we dispatch the actions to the redux store using the dispatch method.
//            the store then calculates the new state based on the action.

// subscribing to store = components can subscribe to the store to be able to notify that whenever the state changes.
//                        connect function is used to connect or subscribe react components to the redux store.

// Middleware = redux allows you to apply middleware like redux-thunk or redux-saga to handle asynchronous actions.

const store = configureStore({
  reducer: persistedReducer,
  // this provides access to the default middleware used by redux toolkit.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // returns an array of middleware that includes the thunk middleware for handling async actions
      // and other essential middleware for handling actions like logging and etc

      serializableCheck: {
        // serializablily in redux  =state in a redux store is serializable
        // means it allows to record,replay and persist.

        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],

        // FLUSH :
        // REGISTER :
        // REHYDRATE :
        // PAUSE :
        // PERSIST :
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

// context API
// without having to pass it explicitly through props we can share data or state with multiple child components.
// from only one place.
root.render(
  <React.StrictMode>
    {/* it wraps the entire components tree */}
    {/* this came from the state index.js */}
    {/* this can be used throughout our application
    with const token = useSelector((state)=>state.token) likewise */}

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        {/* here we are placing our app component here so that it can persist the user information */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>



);
