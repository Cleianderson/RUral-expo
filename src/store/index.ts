import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import rootReducer from "~/reducers"
import storageSaga from "~/sagas/Storage"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(storageSaga)

export default store