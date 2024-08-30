import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userData.js"

export const store= configureStore({reducer:{user:userInfo}});

export default store;