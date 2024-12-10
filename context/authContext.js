import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
export const AuthContext= createContext()
export const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState('')
    const [value, setvalue] = useState('hello')
    useEffect(()=>{     
        const fetchUser = async()=>{
            const authToken = await AsyncStorage.getItem('authToken')
            const decodedToken  = jwtDecode(authToken)
            
            const userId = decodedToken.userId
            setUserId(userId)
        }
        fetchUser()
    })
   
  return (
    <AuthContext.Provider value={{userId,value}}>
      {children}
    </AuthContext.Provider>
  )
}

