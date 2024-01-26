import { Stack } from "expo-router/stack"
import moment from "moment"
import { useEffect } from "react"
import { SafeAreaView, View } from "react-native"
import { useDispatch } from "react-redux"

import Home from "~/app/home"
import { StorageActionTypes } from "~/utils/enums"

const isoWeekOfTomorrow = moment().add(1, "days").isoWeek()

export default function Main() {
  const dispatch = useDispatch()

  const setDay = (day: number) =>
    dispatch({ type: "SET_DAY", payload: { day } })

  useEffect(() => {
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day
    setDay(_day)

    // initalizeOneSignal()
    dispatch({ type: StorageActionTypes.getFavorites })
    dispatch({ type: StorageActionTypes.getWeek })
    dispatch({ type: StorageActionTypes.getWarnings })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "",
          navigationBarColor: "#fff",
        }}
      />
      <Home />
    </View>
  )
}
