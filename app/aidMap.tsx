import ScreenWrapper from '@/components/ScreenWrapper';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface Hospital {
  id: number;
  lat: number;
  lon: number;
  tags?: { name?: string; amenity?: string };
  distance?: number;
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const AidMap: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Location permission denied');
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLatitude(loc.coords.latitude);
        setLongitude(loc.coords.longitude);
        fetchHospitals(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchHospitals = async (lat: number, lng: number) => {
      try {
        const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:10000,${lat},${lng});
            node["amenity"="clinic"](around:10000,${lat},${lng});
          );
          out center;
        `;
        const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
        const res = await fetch(url);
        const json = await res.json();
        const elements: Hospital[] = (json.elements || [])
          .filter((h: any) => h.lat && h.lon)
          .map((h: any) => ({
            id: h.id,
            lat: h.lat,
            lon: h.lon,
            tags: h.tags,
            distance: getDistance(lat, lng, h.lat, h.lon),
          }));
        elements.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        setHospitals(elements);
        if (elements.length > 0 && flatListRef.current) {
          setTimeout(() => flatListRef.current?.scrollToIndex({ index: 0, animated: true }), 500);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{ marginTop: 10 }}>Finding nearby hospitals & clinics...</Text>
      </View>
    );
  }

  if (!hospitals || hospitals.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No hospitals or clinics found nearby.</Text>
      </View>
    );
  }

  // Use vh units in HTML for proper height
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <style>
          #map { height: 97vh; width: 100%; } /* vh ensures map renders */
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
          L.marker([${latitude}, ${longitude}]).addTo(map).bindPopup('You are here').openPopup();
          var hospitals = ${JSON.stringify(hospitals)};
          if(hospitals.length>0){
            var nearest=hospitals[0];
            L.marker([nearest.lat,nearest.lon],{icon:L.icon({
              iconUrl:'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              iconSize:[32,32]
            })}).addTo(map).bindPopup(nearest.tags?.name || 'Nearest Hospital').openPopup();
          }
          for(var i=1;i<hospitals.length;i++){
            var h=hospitals[i];
            L.marker([h.lat,h.lon],{icon:L.icon({
              iconUrl:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              iconSize:[32,32]
            })}).addTo(map).bindPopup(h.tags?.name || 'Hospital/Clinic');
          }
        </script>
      </body>
    </html>
  `;

  return (
    <ScreenWrapper>
    <View style={{ flex: 1 }}>
      <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>
          Nearby Hospitals & Clinics
        </Text>
        <FlatList
          ref={flatListRef}
          data={hospitals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItem,
                index === 0 ? { backgroundColor: '#ffe6e6' } : {},
              ]}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.tags?.name || 'Hospital/Clinic'}</Text>
              <Text>{item.tags?.amenity || 'Unknown type'}</Text>
              <Text>{item.distance?.toFixed(2)} km away</Text>
            </View>
          )}
        />
      </View>
    </View>
    </ScreenWrapper>
  );
};

export default AidMap;

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
