import rootSaga from "./sagas/root.saga";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { Drizzle, generateStore } from "@drizzle/store";
import {options} from "../helper/configuration";
import { AuctionReducer, MemberReducer } from "./reducers";


const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const appReducers = {
  member: MemberReducer,
  auctions: AuctionReducer,
};
const store = generateStore({
  appReducers,
  drizzleOptions: options,
  appMiddlewares: [sagaMiddleware, loggerMiddleware],
});
sagaMiddleware.run(rootSaga);
const drizzle = new Drizzle(options, store);
export default drizzle;
