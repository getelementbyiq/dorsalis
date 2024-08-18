import { configureStore } from "@reduxjs/toolkit";
import userByIdReducer from "./Slices/userByIdSlice";
import recievedDataReducer from "./Slices/recievedData";
import dataReducer from "./Slices/createData";
import globalStatesReducer from "./Slices/globalStates";
import searchReducer from "./Slices/googleSearchSlice";

const store = configureStore(
  {
    reducer: {
      userByIdSlice: userByIdReducer,
      recievedData: recievedDataReducer,
      data: dataReducer,
      globalStates: globalStatesReducer,
      search: searchReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
