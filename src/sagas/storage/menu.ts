import Storage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"
import moment from "moment"
import Api from "~/service/Api"
import { StorageActionTypes, StorageKeys } from "~/utils/enums"

function* watchWeek() {
  yield takeEvery(StorageActionTypes.getWeek, getWeek)
  yield takeLatest(StorageActionTypes.requestWeek, requestWeek)
  // yield takeEvery(StorageActionTypes.updateWeek, updateWeek)
}

function* getWeek() {
  const tomorrow = moment().add(1, "days")
  const weekOfTomorrow = tomorrow.isoWeek()
  const yeardOfTomorrow = tomorrow.year()
  
  const strWeek: string = yield call(Storage.getItem, StorageKeys.week)
  const week: Week = JSON.parse(strWeek)

  if (week === null || (week.number_week !== weekOfTomorrow && week.year === yeardOfTomorrow)) {
    yield put<StorageAction>({ type: StorageActionTypes.requestWeek })
  } else {
    yield updateWeek(week)
  }
}

function* requestWeek() {
  // const setTextFailed = (str: string) => dispatch({ type: 'SET_TEXT_FAILED', payload: { textFailed: str } })
  // const setTextSuccess = (str: string) => dispatch({ type: 'SET_TEXT_SUCCESS', payload: { textSuccess: str } })
  // if ((await NetInfo.fetch()).isConnected) {
  //   setTextFailed('O cardápio ainda não está disponível')




    
  //   setTextSuccess('Cardápio atualizado!')
  //   const req = async () => {
  //     const { data } = await api.get(`/thisweek?week=${isoWeekOfTomorrow}`)
  //     if (data) {
  //       updateWeekStorage(data.data, { number_week: data.number_week })
  //       // setFoods(data.data)
  //       return true
  //     }
  //     return false
  //   }

  //   return req()
  // } else {
  //   yield put({ type: 'SET_TEXT_FAILED', payload: { textFailed: "Parece que você está sem internet" } })
  // }

  const tomorrow = moment().add(1, "days")
  const weekOfTomorrow = tomorrow.isoWeek()
  
  yield put<StorageAction>({
    type: StorageActionTypes.setIsRequesting,
    payload: { value: true },
  })
  const { data: week, status }: AxiosResponse<Week> = yield call(
    Api.get,
    `/thisweek?week=${weekOfTomorrow}`
  )

  if (week?.data.length > 0 && status.toString().startsWith("2")) {
    yield put({
      type: StorageActionTypes.setTextFailed,
      payload: { textFailed: "Cardápio atualizado!" },
    })
    yield updateWeek(week)
    yield put({
      type: StorageActionTypes.setSuccess,
      payload: { success: true },
    })
  } else {
    yield put({
      type: StorageActionTypes.setTextFailed,
      payload: {
        textFailed: "O cardápio dessa semana ainda não está disponível",
      },
    })
    yield put({
      type: StorageActionTypes.setSuccess,
      payload: { success: false },
    })
  }

  yield put({
    type: StorageActionTypes.setIsRequesting,
    payload: { value: false },
  })
}

function* updateWeek(week: Week) {
  yield put<StorageAction>({
    type: StorageActionTypes.setWeek,
    payload: { value: week },
  })
  yield writeWeek()
}

function* writeWeek() {
  const week: Week = yield select<Select>((state) => state.mainState.week)

  yield call(Storage.setItem, StorageKeys.week, JSON.stringify(week))
}

export default watchWeek
