import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAppContext } from '../context/AppContext'

const LoginScreen = () => {
  const { setUser } = useAppContext()

  // 👎👎👎 Microsoft login temporarily disabled due to lack of uni permissions
  /*
  import * as AuthSession from 'expo-auth-session'

  const CLIENT_ID = 'b1dfb6aa-b92b-46e8-927f-9f7ce37983ce'
  const discovery = {
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  }

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  })

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'User.Read', 'Calendars.Read'],
      responseType: 'token',
    },
    discovery
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.params.access_token
      setUser({ token })
      console.log('✅ Token:', token)
    } else if (response?.type == 'error') {
      console.error('❌ Login failed:', response)
    }
  }, [response])
  */

  const handleMockLogin = () => {
    //Simulate successful login for demo
    const mockUser = {
      name: 'Zamin',
      email: 'zamin002@campus.goldsmiths.ac.uk',
    }

    setUser(mockUser)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goldsmiths App</Text>
      <Button
        title="Log in with Microsoft"
        onPress={handleMockLogin} //Use mock login for now
      />
      <Text style={styles.note}>*Simulated login — university Microsoft login is blocked</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#257f66' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  note: { marginTop: 12, color: '#eee', fontSize: 12, textAlign: 'center' },
})

export default LoginScreen
