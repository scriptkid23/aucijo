import rootSaga from "./sagas/root.saga";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { Drizzle, generateStore } from "@drizzle/store";
import {options} from "../helper/constant";
import { combineReducers } from "redux";
import { MemberReducer } from "./reducers";


const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const appReducers = {
  member: MemberReducer,
};
const store = generateStore({
  appReducers,
  drizzleOptions: options,
  appMiddlewares: [sagaMiddleware, loggerMiddleware],
});
sagaMiddleware.run(rootSaga);
const drizzle = new Drizzle(options, store);
export default drizzle;
