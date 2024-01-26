import { Stack } from "expo-router/stack"
import { View } from "react-native"

import Configs from "~/pages/Configuration"

export default function Configurations() {

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Configurações",
          navigationBarColor: "#fff",
        }}
      />
      <Configs />
    </View>
  )
}
