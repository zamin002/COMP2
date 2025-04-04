import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Platform, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

//no access to actual timetable cus of uni restrictions. admins aired my emails as well. 👎👎👎
const mockLessons = [
  {
    id: '1',
    title: 'Intro to Computing',
    location: 'RHB 143',
    date: '2024-04-25T10:00:00',
    duration: 2,
  },
  {
    id: '2',
    title: 'Digital Cultures Lecture',
    location: 'RHB 137a',
    date: '2024-04-26T13:00:00',
    duration: 1,
  },
]

const CalendarScreen = ({ navigation }) => {
  const [exporting, setExporting] = useState(false)

  //runs when this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      return () => {}
    }, [])
  )

  //ask user for permission to use calendar
  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync()
    if (status == 'granted') {
      return true
    } else {
      Alert.alert('Permission required', 'Calendar access denied.')
      return false
    }
  }

  //export lessons to calendar
  const exportToCalendar = async () => {
    setExporting(true)
    const granted = await requestCalendarPermissions()
    if (!granted) return

    const defaultCalendar = await Calendar.getDefaultCalendarAsync()
    for (const lesson of mockLessons) {
      const startDate = new Date(lesson.date)
      const endDate = new Date(startDate.getTime() + lesson.duration * 60 * 60 * 1000)

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: lesson.title,
        location: lesson.location,
        startDate,
        endDate,
        timeZone: 'Europe/London', //user could probably be in a different time zone so this is important.
      })
    }
    setExporting(false)
    Alert.alert('Successfully Exported', 'Lessons added to your calendar :D.')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Lessons</Text>
      <FlatList
        data={mockLessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const dateObj = new Date(item.date)
          const dateString = dateObj.toLocaleDateString('en-UK', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
          const timeString = dateObj.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' })

          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.details}>{item.location}</Text>
              <Text style={styles.details}>{dateString} at {timeString}</Text>
            </View>
          )
        }}
      />
      <Button title={exporting ? 'Exporting...' : 'Export to Phone Calendar'} onPress={exportToCalendar} disabled={exporting} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#257f66',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    marginTop: 4,
  },
})

export default CalendarScreen
