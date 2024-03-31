import React, { useEffect, useReducer } from 'react'

import ConfigContext from '~/contexts/ConfigContext'

import reducer, { initConfigs } from './reducer'
import { getItem } from '~/service/Storage'

const initalState = {
  showIndicator: true,
  showDateOnIndicator: false
}

const Config: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [configReduce, configDispatch] = useReducer<ConfigsReducer, Configs>(reducer, initalState, initConfigs)

  useEffect(()=>{
    const loadConfigs = async () => {
      const configs = (await getItem<Configs>('@RUral:config')).data
      configDispatch({ type: 'UPDATE_CONFIG', data: configs })
    }

    loadConfigs()
  },[])

  return (
    <ConfigContext.Provider value={{
      configs: configReduce,
      configDispatch
    }} >
      {children}
    </ConfigContext.Provider>
  )
}

export default Config
