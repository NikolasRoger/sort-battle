import { createContext, useContext, useEffect, useState } from "react"

export const GeneralContext = createContext()

export function GeneralContextProvider({ children }) {
  const [roulleteConfig, setRoulleteConfig] = useState([])

  const addRoulleteValue = (value) => {
    setRoulleteConfig((conf) => {
      conf.push(value)
      return conf
    })
  }

  const removeRoulleteValue = (index) => {
    setRoulleteConfig((conf) => {
      conf = conf.filter((n, i) => i != index)
      return conf
    })
  }

  const saveConfig = () => {
    localStorage.setItem("roulleteConfig", JSON.stringify(roulleteConfig))
  }

  const roullete = {
    add: addRoulleteValue,
    remove: removeRoulleteValue,
    get: roulleteConfig
  }

  useEffect(() => {
    const localRoulleteConfig = localStorage.getItem("roulleteConfig")
    
    if(localRoulleteConfig) {
      setRoulleteConfig(JSON.parse(localRoulleteConfig))
    }
  }, [])

  return (
      <GeneralContext.Provider 
        value={{
          roullete,
          saveConfig
        }}
      >
          {children}
      </GeneralContext.Provider>
  )
} 

export const useConfig = () => {
  return useContext(GeneralContext)
}