import { Stack } from "expo-router/stack"
import { View } from "react-native"

import Warn from "~/pages/Warn"

export default function Warnings() {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Avisos",
          navigationBarColor: "#fff",
        }}
      />
      <Warn />
    </View>
  )
}
