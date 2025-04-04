import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TFL_KEY } from '../config';

//shows arrival times for bus/train stop
const StopDetailScreen = ({ route }) => {
  const { stopData } = route.params //stop info passed from TflTimeScreen
  const [groupedArrivals, setGroupedArrivals] = useState({}) //hold arrival grouped by line/destination
  const [loading, setLoading] = useState(false)

  //fetch updated arrival from TFL API
  const fetchUpdatedArrivals = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stopData.arrivals[0].naptanId}/Arrivals?app_key=${TFL_KEY}`
      )
      const data = await res.json()

      //sort by soonest to arrive
      const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation)

      //group by line & destination e.g. 21 to lewisham
      const grouped = {}
      sorted.forEach(item => {
        const key = `${item.lineName}-${item.destinationName}`
        if (!grouped[key]) {
          grouped[key] = {
            lineName: item.lineName,
            destinationName: item.destinationName,
            times: []
          }
        }
        grouped[key].times.push(Math.round(item.timeToStation / 60)) //arrival time in minutes
      })

      setGroupedArrivals(grouped);
    } catch (error) {
      console.error("Error updating arrivals: ", error)
    } finally {
      setLoading(false)
    }
  }

  //fetch on mount
  useEffect(() => {
    fetchUpdatedArrivals()
    const interval = setInterval(fetchUpdatedArrivals, 30000) //auto update every 30s
    return () => clearInterval(interval)
  }, [])

  const arrivalData = Object.values(groupedArrivals)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{stopData.stopName}</Text>
        <FlatList
          data={arrivalData}
          keyExtractor={(item, index) => `${item.lineName}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.info}>
              {(item.destinationName.includes('Rail Station')) ? '🚆' : '🚌'} {item.lineName} to {item.destinationName}
              </Text>
              <Text style={styles.time}>
                Arrives in: {item.times.join(', ')} min
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#257f66',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default StopDetailScreen
