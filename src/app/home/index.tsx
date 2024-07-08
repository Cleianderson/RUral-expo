/* eslint-disable react/display-name */
import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

// import Warn from '~/pages/Warn'
import Suggestion from "~/pages/Suggestion"
import Favorites from "~/pages/Favorites"
import Home from "~/pages/Home"
import { View, Pressable, Image, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { router } from "expo-router"

import TabBar from "~/components/TabBar"
// import { Badge } from 'react-native-paper'
import { useSelector, useDispatch } from "react-redux"
import { StorageActionTypes } from "~/utils/enums"

const TabBottom = createBottomTabNavigator()

const RouteHome = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const thereIsWarn = useSelector<RootState, boolean>((state) => {
    return state.mainState.thereIsWarn
  })

  const setAction = (fn: string | undefined) =>
    dispatch({ type: "SET_ACTION", payload: { action: fn } })

  const reload = () => dispatch({ type: StorageActionTypes.requestWeek})

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
            width: 150,
            justifyContent: "space-around",
          }}
        >
          <Pressable onPress={() => router.push("warning")}>
            {thereIsWarn && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: -1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  borderRadius: 50,
                  backgroundColor: "#ff7700",
                  width: 15,
                  height: 15,
                  zIndex: 1,
                }}
              />
            )}
            {/*<Badge visible={thereIsWarn} style={{position: 'absolute', top: -1}} size={12}/>*/}
            <Icon name="bell-outline" color="#1b2d4f" size={25} />
          </Pressable>
          <Pressable onPress={reload}>
            <Icon name="reload" color="#1b2d4f" size={25} />
          </Pressable>
          <Pressable onPress={() => router.push("config")}>
            <Icon name="cog" color="#1b2d4f" size={25} />
          </Pressable>
        </View>
      ),
      headerLeft: () => (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../../assets/iconSquare.png")}
        />
      ),
    })
  }, [thereIsWarn])
  return (
    <TabBottom.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <TabBottom.Screen name="Início" component={Home} />
      {/* <TabBottom.Screen name="Avisos" options={{ unmountOnBlur: true }} component={Warn} /> */}
      <TabBottom.Screen name="Favoritos" component={Favorites} />
      <TabBottom.Screen name="Sugerir" component={Suggestion} />
    </TabBottom.Navigator>
  )
}

export default RouteHome
