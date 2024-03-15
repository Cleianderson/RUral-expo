import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: #fff;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  /* padding: 10px 0px 10px 0px; */
`

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border: 0px solid #ddd;
  border-top-width: 1px;
  padding-top: 5px;
`

export const EmptyText = styled.Text`
  color: #aaa;
  font-size: 30px;
  text-align: center;
`

export const EmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
`

export const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  // padding: 5px 10px;
  elevation: 10;
  padding-top: 10px;
  `
export const NavButton = styled.Pressable`
  min-height: 50px;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({selected}) => selected ? '#fff' : '#eee'};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`
