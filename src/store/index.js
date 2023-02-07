import { applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer"

import thunk from "redux-thunk"

const storeThunk = applyMiddleware(thunk)
const store = configureStore({ reducer }, storeThunk)
export default store