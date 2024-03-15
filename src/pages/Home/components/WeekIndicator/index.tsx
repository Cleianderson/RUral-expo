import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Icon from "@expo/vector-icons/MaterialCommunityIcons"


import constants from '~/service/constants'
import { Container, Content, Button, BText, TxtDate } from './styles'

import Config from '~/contexts/ConfigContext'
import { getDate } from '~/service/DateUtils'
import { View } from 'react-native'

export default function WeekIndicator(props) {

  const { configs } = useContext(Config)
  const day = useSelector<RootState, number>(state => state.mainState.day)
  const favorites = useSelector<RootState, string[] | undefined>(state => state.storageState.favorites)
  const week = useSelector<RootState, Week | undefined>(state => state.mainState.week)

  function checkItem(index: number) {
    let result = false

    const _menuDayLaunch = Object.values(week?.data[index]['almoco'])
    const _menuDayDinner = Object.values(week?.data[index]['jantar'])
    const _menuDay = [..._menuDayDinner, ..._menuDayLaunch]
    
    for(let strFood of _menuDay){
      const _result = favorites?.some((fav) => strFood.toUpperCase().includes(fav.toUpperCase()))

      if(_result){
        result = true
        break
      }
    }
    return result
  }

  return (
    <Container style={{ elevation: 2 }} >
      <Content>
        {constants.STRING_DAYS.map((strDay, index) => (
          <View style={{ flex: 1 }} key={index} >
            <Button
              onPress={() => props.press(index)}
              hitSlop={{ top: 5, bottom: 10, left: 5, right: 5 }}
              selected={day === index}
              style={{
                borderBottomLeftRadius: day - index == -1 ? 10 : 0,
                borderBottomRightRadius: day - index == 1 ? 10 : 0,
              }}
            >
              <BText selected={day === index}>{strDay}</BText>
              {configs.showDateOnIndicator && <TxtDate selected={day === index} >{getDate(index)}</TxtDate>}
              <Icon name="star"
                color={checkItem(index) ? constants.SECOND_COLOR : "transparent"}
                size={10}
              />
            </Button>
            {/* {day === index && <View
              style={{
                height: 3,
                backgroundColor: '#f9b233',
                borderRadius: 50,
              }}
            />} */}
          </View>
        ))}
      </Content>
    </Container>
  )
}
