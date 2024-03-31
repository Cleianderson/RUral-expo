import React, { useContext } from 'react'
import { BackHandler, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Container } from './styles'
import SwitchLabeled from './components/SwitchLabeled'
import Button from './components/Button'
import Config from '~/contexts/ConfigContext'

const Configuration = () => {
  const { configs, configDispatch } = useContext(Config)
  const { showIndicator, showDateOnIndicator } = configs

  const updateConfig = (data: any) => configDispatch({ type: 'UPDATE_CONFIG', data: { ...data } })

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <SwitchLabeled
          label='Mostrar indicador de dias'
          isActived={showIndicator}
          onPress={() => updateConfig({ showIndicator: !showIndicator })}
        />
        <SwitchLabeled
          nested
          disabled={showIndicator === false}
          label='Exibir datas'
          isActived={showDateOnIndicator}
          onPress={() => updateConfig({ showDateOnIndicator: !showDateOnIndicator })}
        />
      </View>
      <Button
        label="LIMPAR TODOS OS DADOS"
        onPress={() => {
          const clear = async () => {
            await AsyncStorage.clear()
            BackHandler.exitApp()
          }
          clear()
        }}
        confirm
        titleAlert='Quer mesmo apagar todos os dados?'
        titleMessage='Os dados de configurações, semanas e favoritos seão excluídos'
      />
    </Container>
  )
}

export default Configuration
