// ResimGoster.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function ResimGoster({ route }) {
  const { sgkKimlik } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: sgkKimlik }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default ResimGoster;
