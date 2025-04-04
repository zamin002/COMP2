import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Create context to hold global app state
const AppContext = createContext()

//wraps whole app + provides shared values e.g. user and theme
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null) //store user auth info
  const [theme, setTheme] = useState('light') //store theme settings
  const [loadingUser, setLoadingUser] = useState(true) //show loading spinner while checking if logged in

  //load user info from local storage when first loading the app
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser)) //remembers user data
      }
      setLoadingUser(false)
    }
    loadUser()
  }, [])

  //save user info to local storage whenever it changes
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user))
    } else {
      AsyncStorage.removeItem('user')
    }
  }, [user])

  //give all context values to any component that makes use of this
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme, loadingUser }}>
      {children}
    </AppContext.Provider>
  )
}

//Custom hook to use context
export const useAppContext = () => useContext(AppContext)
