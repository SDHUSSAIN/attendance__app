import * as React from 'react';
import MapView, { Marker } from "react-native-maps";
import { View } from 'react-native';
import styles from './style';

const Map=({lat,logi})=> {

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      provider = "google" 
      initialRegion={{
        latitude: lat,
        longitude: logi,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15
      }}>
        <Marker coordinate={{ latitude: lat, longitude: logi }} />
        
      </MapView>
    </View>
  );
}

export default Map;

