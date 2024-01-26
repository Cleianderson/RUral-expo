import { KeyboardAvoidingView, SafeAreaView } from "react-native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"

import store from "~/store"
import Requesting from "~/components/Requesting"
import Config from "~/providers/Config"

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Provider store={store}>
          <Config>
            <Stack
              screenOptions={{
                statusBarColor: "#fff",
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#1b2d4f",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                contentStyle: { flex: 1 },
              }}
            />
          </Config>
          <Requesting />
        </Provider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
