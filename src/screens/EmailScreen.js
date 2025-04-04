import React from 'react';
import { View, Text, Button, StyleSheet, Linking, Alert, Platform } from 'react-native';

const EmailScreen = () => {
  //function to open outlook or fallback email
  const openOutlook = async () => {
    const outlookUrl = Platform.OS == 'ios' 
    ? 'ms-outlook://' //ios 
    : 'intent://com.microsoft.office.outlook#Intent;scheme=ms-outlook;end;' //android
    const fallbackEmailUrl = 'mailto:' //fallback

    try {
      //try open outlook
      const supported = await Linking.canOpenURL(outlookUrl)
      if (supported) {
        await Linking.openURL(outlookUrl)
      } else {
        //if outlook isn't available it will open a generic email handler
        const fallbackSupported = await Linking.canOpenURL(fallbackEmailUrl)
        if (fallbackSupported) {
          await Linking.openURL(fallbackEmailUrl)
        } else {
          //if theres no email available, user gets an alert
          Alert.alert(
            'No Email App Found',
            'Outlook not installed, no default email app available either.'
          )
        }
      }
    } catch (err) {
      //handling errors
      console.error('Error opening email app:', err)
      Alert.alert('Error', 'Something went wrong trying to open Outlook.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email</Text>
      <Button title="Open Outlook" onPress={openOutlook} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#257f66',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
})

export default EmailScreen
