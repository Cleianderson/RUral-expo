import styled from 'styled-components/native'
import constants from '../../service/constants'
import { Picker } from '@react-native-picker/picker'

export const Container = styled.View`
  flex: 1;
  padding: 7px 10px;
  border-radius: ${constants.RADIUS};
`

export const Content = styled.ScrollView`
  flex: 1;
`

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const Button = styled.Pressable`
  padding: 10px 25px;
  /* background: #1b2d4f; */
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 60%;
  margin: 5px;
`
export const ChooseBox = styled(Picker)``

export const TextInput = styled.TextInput`
  border: 1px solid #ccc;
  border-bottom-width: 1px;
  border-radius: 10px;
  padding: 10px;
`

export const Label = styled.Text`
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`

export const ContainerChooseBox = styled.View`
  border: 1px solid #ccc;
  border-radius: 10px;
`
