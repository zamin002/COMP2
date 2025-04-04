import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const GridItem = ({ title, image, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center',
    margin: 10,
    padding: 15,
  },
  imageWrapper: {
    alignSelf: 'center', // Ensures the image is centered in its space
  },
  image: {
    width: 140, // Adjust size as needed
    height: 140,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GridItem;
