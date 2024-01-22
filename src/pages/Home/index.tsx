import React, {
  useCallback,
  useContext,
  useEffect,
  useRef
} from "react"
import {
  FlatList,
  View,
  ViewToken,
  useWindowDimensions
} from "react-native"
import Svg, { Circle, G, Path, Rect } from "react-native-svg"
// import ViewPage from '@react-native-community/viewpager'

import MButton from "./components/MenuButton"
import WeekIndicator from "./components/WeekIndicator"
import { Container, Content, EmptyContainer, EmptyText } from "./styles"

import { useDispatch, useSelector } from "react-redux"
import Config from "~/contexts/ConfigContext"

const Home = () => {
  const PageFoods = useRef<FlatList<Table> | null>(null)
  const { width } = useWindowDimensions()

  const { configs } = useContext(Config)
  // const foods = useSelector<RootState, Table[] | undefined>(state => state.mainState.foods)
  const week = useSelector<RootState, Week | undefined>(
    (state) => state.mainState.week
  )
  const day = useSelector<RootState, number | undefined>(
    (state) => state.mainState.day
  )
  const dispatch = useDispatch()

  const setDay = (num: number) =>
    dispatch({ type: "SET_DAY", payload: { day: num } })

  const viewableItemsChanged = useCallback<FlatViewableChanged>(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const _day = viewableItems[0].index
        if (typeof _day == "number") {
          setDay(_day)
        }
      }
    },
    []
  )

  useEffect(() => {
    // if (PageFoods.current !== undefined) {
    //   if (day !== undefined) {
    //     PageFoods.current.setPageWithoutAnimation(day)
    //   }
    //   dispatch({ type: 'SET_HOME_VIEW', payload: { homeView: PageFoods.current } })
    // }

    // console.log(width)
  }, [week])

  if (week === undefined || week.data.length === 0 || day === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <EmptyContainer>
          <Svg
            // xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 135.467 135.467"
          >
            <G transform="translate(0 -161.533)">
              <Path
                fill="#b8c4f0"
                d="M43.97 191.624a3.208 3.208 0 0 0-3.872 2.385l-15.74 66.229a3.208 3.208 0 0 0 2.385 3.871l50.923 12.103a3.208 3.208 0 0 0 3.872-2.385l15.74-66.229a3.208 3.208 0 0 0-2.386-3.872z"
              />
              <Path
                fill="#4c5a80"
                d="M24.142 188.811a3.208 3.208 0 0 0-2.788 3.593l8.522 67.538a3.208 3.208 0 0 0 3.593 2.787l51.929-6.552a3.208 3.208 0 0 0 2.787-3.593l-8.521-67.537a3.208 3.208 0 0 0-3.593-2.788z"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={218.994}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={218.994}
                fill="#9a9a9a"
                ry={0.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Circle cx={77.582} cy={226.562} r={23.974} fill="#b7d6dfc5" />
              <Path
                fill="#6387ca"
                d="M77.513 200.423a26.002 26.002 0 0 0-26.002 26.002 26.002 26.002 0 0 0 26.002 26.001 26.002 26.002 0 0 0 26.001-26.001 26.002 26.002 0 0 0-26.001-26.002zm0 5.62a20.381 20.381 0 0 1 20.38 20.382 20.381 20.381 0 0 1-20.38 20.38 20.381 20.381 0 0 1-20.382-20.38 20.381 20.381 0 0 1 20.382-20.381z"
              />
              <Path
                fill="#6387ca"
                d="M89.095 246.593s10.044 23.083 20.505 23.878c1.98.15 4.367-1.9 4.517-3.879.767-10.09-19.778-23.03-19.778-23.03z"
              />
            </G>
          </Svg>
          <EmptyText style={{ fontSize: 16 }}>sem cardápio, ainda</EmptyText>
        </EmptyContainer>
      </View>
    )
  } else {
    return (
      <Container>
        {week && configs.showIndicator && (
          <WeekIndicator
            press={(index: number) =>
              PageFoods.current?.scrollToIndex({ index })
            }
          />
        )}
        <Content>
          <FlatList
            data={week?.data}
            ref={(flatList) => (PageFoods.current = flatList)}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            contentContainerStyle={{ alignItems: "center" }}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 100,
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  justifyContent: "center",
                  width,
                }}
                key={index}
              >
                <MButton item={item} launch />
                <MButton item={item} />
              </View>
            )}
          />
        </Content>
      </Container>
    )
  }
}

export default Home

type FlatViewableChanged = (info: {
  viewableItems: Array<ViewToken>
  changed: Array<ViewToken>
}) => void
