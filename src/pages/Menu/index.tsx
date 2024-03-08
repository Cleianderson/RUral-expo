import React from "react"
import { Pressable, Text } from "react-native"
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
  NavButton,
  DayText,
  Header,
  Footer,
} from "./styles"
import constants from "../../service/constants"

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

const Menu = ({ route }) => {
  const { type } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const day = useSelector<RootState, number>((state) => state.mainState.day)
  // const foods = useSelector<RootState, Table[] | undefined>((state) => state.mainState.foods)
  const week = useSelector<RootState, Week | undefined>((state) => state.mainState.week)
  const favorites = useSelector<RootState, string[]>((state) => state.storageState.favorites)
  const homeViewPage = useSelector<RootState, JSX.Element | undefined>(
    (state) => state.mainState.homeView
  )

  const dynamicArray = type === "almoco" ? constants.ARRAY_LAUNCH : constants.ARRAY_DINNER

  const addFavorites = (favItem: string) =>
    dispatch({ type: "ADD_FAVORITES", payload: { value: favItem } })
  const removeFavorites = (favItem: string) =>
    dispatch({ type: "DEL_FAVORITES", payload: { value: favItem } })

  const previousPage = () => {
    if (day > 0 && homeViewPage !== undefined) {
      // setDay(day - 1)
      homeViewPage.setPage(day - 1)
    }
  }

  const nextPage = () => {
    if (day < 4 && homeViewPage !== undefined) {
      homeViewPage.setPage(day + 1)
    }
  }

  function checkItem(str) {
    const result = favorites?.filter((fav) => str.toUpperCase().includes(fav.toUpperCase())) ?? []
    return result.length > 0
  }

  async function toggleFavorite(favoriteItem = "") {
    const upperFavoriteItem = favoriteItem.toUpperCase().trim()

    if(favorites.includes(upperFavoriteItem)){
      removeFavorites(upperFavoriteItem)
    }

    const favoritesFiltered = favorites.filter(fav => {
      return upperFavoriteItem.includes(fav.toUpperCase().trim())
    })

    if(favoritesFiltered.length === 0){
      addFavorites(upperFavoriteItem)
    }

    for(let favorite of favoritesFiltered){
      removeFavorites(favorite)
    }

    // const filteredFavorites = favorites.filter((favorite) => {
    //   const upperFavorite = favorite.toUpperCase().trim()
    //   return upperFavoriteItem.includes(upperFavorite) || upperFavorite.includes(upperFavoriteItem)
    // })

    // console.info([upperFavoriteItem, filteredFavorites])
    // if (filteredFavorites.includes(upperFavoriteItem)) {
    //   removeFavorites(upperFavoriteItem)
    //   removeFavorites(upperFavoriteItem)

    //   // const _favoriteItem = favorites.map(fav => {
    //   //   return upperFavoriteItem.toUpperCase().trim().includes(fav)
    //   // })
    //   // if(_favoriteItem !== undefined){
    //   //   removeFavorites(_favoriteItem)
    //   // }
    // } else {
    //   addFavorites(upperFavoriteItem)
    // }
    // // if (checkItem(favoriteItem)) {
    // //   removeFavorites(upperFavoriteItem)
    // // } else {
    // //   addFavorites(upperFavoriteItem)
    // // }
  }

  return (
    <Container>
      <Header>
        <DayText>
          {type === "almoco" ? "Almoço" : "Jantar"} - {constants.STRING_DAYS_EXTENDED[day]}
        </DayText>
      </Header>
      <Content showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {dynamicArray.map((strFood, inx) => (
          <FoodContainer key={inx}>
            <MenuContainer>
              <FoodText>{extensive[strFood]}</FoodText>
              <FoodDescription>{week.data[day][type][strFood].toUpperCase()}</FoodDescription>
            </MenuContainer>
            <Pressable
              onPress={() => toggleFavorite(week.data[day][type][strFood])}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Icon
                name="star"
                color={checkItem(week.data[day][type][strFood]) ? constants.SECOND_COLOR : "#ccc"}
                size={25}
              />
            </Pressable>
          </FoodContainer>
        ))}
      </Content>
      <Footer>
        <NavButton
          onPress={previousPage}
          disabled={day === 0}
          style={day === 0 ? { opacity: 0.5 } : {}}
        >
          <Icon name="chevron-left" color="#1b2d4f" size={25} />
          <Text style={{ marginRight: 10 }}>Anterior</Text>
        </NavButton>
        <NavButton onPress={navigation.goBack}>
          <Icon name="menu-down" color="#1b2d4f" size={25} />
        </NavButton>
        <NavButton onPress={nextPage} disabled={day >= 4} style={day >= 4 ? { opacity: 0.5 } : {}}>
          <Text style={{ marginLeft: 10 }}>Próximo</Text>
          <Icon name="chevron-right" color="#1b2d4f" size={25} />
        </NavButton>
      </Footer>
      {/* <Pressable
        onPress={navigation.goBack}
        style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}
      >
        <Text style={{ color: '#1b2d4f', fontWeight: 'bold', textDecorationLine: 'underline' }}>
          voltar
        </Text>
      </Pressable> */}
    </Container>
  )
}

export default Menu
