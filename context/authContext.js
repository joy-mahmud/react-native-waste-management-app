import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
export const AuthContext= createContext()
export const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState('')
    const [user,setUser]=useState(null)

    useEffect(()=>{     
        const fetchUser = async()=>{
            const authToken = await AsyncStorage.getItem('authToken')
            const decodedToken  = jwtDecode(authToken)
            
            const userId = decodedToken.userId
            setUserId(userId)
        }
        const getUser = async()=>{
          const userData = await AsyncStorage.getItem('user');
          const user = JSON.parse(userData);
          setUser(user)
          //console.log(user)
        }
        fetchUser()
        getUser()
    },[])
   

   
  return (
    <AuthContext.Provider value={{userId,user}}>
      {children}
    </AuthContext.Provider>
  )
}

