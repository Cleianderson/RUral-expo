import styled from 'styled-components/native'

type CommonProps = {
  selected: boolean
}

export const Container = styled.View`
  /* border: 1px solid; */
  padding-bottom: 10px;
  /* elevation: 10; */
  `

export const Content = styled.View`
  flex-direction: row;
`

export const Button = styled.Pressable`
  min-height: 50px;
  justify-content: center;
  align-items: center;
  background: ${({selected}) => (selected ? '#fff' : 'rgb(242, 242, 242)')};
  padding: 10px 15px 5px 15px;
  border: 0px solid #ccc;
  /* border-radius: ${({selected}) => (selected ? 0 : 10)}px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0; */
`

export const BText = styled.Text<CommonProps>`
  text-align: center;
  font-weight: bold;
  color: ${({ selected }) => (selected ? '#f9b233' : '#999')};
`
export const TxtDate = styled.Text<CommonProps>`
  color: ${({ selected }) => (selected ? '#f9b233' : '#999')};
`
