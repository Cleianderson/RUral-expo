import React, { useState } from "react"
import { Pressable, Text, View, useWindowDimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"

import {
  Container,
  Content,
  FoodDescription,
  FoodText,
  FoodContainer,
  MenuContainer,
} from "./styles"
import constants from "~/service/constants"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const extensive = {
  p1: "Prato Principal 1",
  p2: "Prato Principal 2",
  gre: "Na Grelha",
  gua: "Guarnição",
  fag: "Fast Grill",
  veg: "Vegetariano",
  sal: "Salada Crua",
  sco: "Salada Cozida",
  sopa: "Sopa",
  sob: "Sobremesa",
  suc: "Suco",
}

const dynamicArray = [
  'p1',
  'p2',
  'gre',
  'fag',
  'veg',
  'gua',
  'sal',
  'sco',
  'sopa',
  'sob',
  'suc'
]

const Menu = ({ type, day }) => {
  const dispatch = useDispatch()

  const { width } = useWindowDimensions()

  const favorites = useSelector<RootState, string[]>((state) => state.storageState.favorites)
  const week = useSelector<RootState, Week | undefined>((state) => state.mainState.week)
  // const day = useSelector<RootState, number>((state) => state.mainState.day!)


  const addFavorites = (favItem: string) =>
    dispatch({ type: "ADD_FAVORITES", payload: { value: favItem } })
  const removeFavorites = (favItem: string) =>
    dispatch({ type: "DEL_FAVORITES", payload: { value: favItem } })

  function checkItem(str) {
    const result = favorites?.filter((fav) => str.toUpperCase().includes(fav.toUpperCase())) ?? []
    return result.length > 0
  }

  async function toggleFavorite(favoriteItem = "") {
    const upperFavoriteItem = favoriteItem.toUpperCase().trim()

    if (favorites.includes(upperFavoriteItem)) {
      removeFavorites(upperFavoriteItem)
    }

    const favoritesFiltered = favorites.filter(fav => {
      return upperFavoriteItem.includes(fav.toUpperCase().trim())
    })

    if (favoritesFiltered.length === 0) {
      addFavorites(upperFavoriteItem)
    }

    for (let favorite of favoritesFiltered) {
      removeFavorites(favorite)
    }

  }

  return (
    <Container style={{ width }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}>
          {Object.keys(week!.data[day][type]).sort().map((cod, index) => (
            <FoodContainer key={index}>
              <MenuContainer>
                <FoodText>{extensive[cod]}</FoodText>
                <FoodDescription>{week?.data[day][type][cod].toUpperCase()}</FoodDescription>
              </MenuContainer>
              <Pressable
                onPress={() => toggleFavorite(week?.data[day][type][cod])}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <Icon
                  name="star"
                  color={checkItem(week?.data[day][type][cod]) ? constants.SECOND_COLOR : "#ccc"}
                  size={25}
                />
              </Pressable>
            </FoodContainer>
          ))}
          {/* {dynamicArray.map((strFood, inx) => (
            week?.data[day][type][strFood] && (
              <FoodContainer key={inx}>
                <MenuContainer>
                  <FoodText>{extensive[strFood]}</FoodText>
                  <FoodDescription>{week?.data[day][type][strFood].toUpperCase()}</FoodDescription>
                </MenuContainer>
                <Pressable
                  onPress={() => toggleFavorite(week?.data[day][type][strFood])}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Icon
                    name="star"
                    color={checkItem(week?.data[day][type][strFood]) ? constants.SECOND_COLOR : "#ccc"}
                    size={25}
                  />
                </Pressable>
              </FoodContainer>)
          ))} */}
        </Content>
      </View>
    </Container>
    // <Container>
    //   <Content showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
    //     {dynamicArray.map((strFood, inx) => (
    //       <FoodContainer key={inx}>
    //         {/* <MenuContainer>
    //           <FoodText>{extensive[strFood]}</FoodText>
    //           <FoodDescription>{week?.data[day][type][strFood].toUpperCase()}</FoodDescription>
    //         </MenuContainer> */}
    //         <Pressable
    //           onPress={() => toggleFavorite(week?.data[day][type][strFood])}
    //           hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
    //         >
    //           <Icon
    //             name="star"
    //             color={checkItem(week?.data[day][type][strFood]) ? constants.SECOND_COLOR : "#ccc"}
    //             size={25}
    //           />
    //         </Pressable>
    //       </FoodContainer>
    //     ))}
    //   </Content>
    // </Container>
  )
}

export default Menu
