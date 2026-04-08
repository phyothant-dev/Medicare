// app/aid-map.tsx
import ScreenWrapper from '@/components/ScreenWrapper';
// 💡 Import the useLanguage hook
import { useLanguage } from '@/context/LanguageContext';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
// 💡 Import Ionicons for the location icon
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

interface Hospital {
  id: number;
  lat: number;
  lon: number;
  tags?: { name?: string; amenity?: string };
  distance?: number;
}

/**
 * Calculates the distance between two geographical coordinates (Haversine formula).
 * @param lat1 Latitude of point 1
 * @param lon1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lon2 Longitude of point 2
 * @returns Distance in kilometers (km)
 */
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
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

// 💡 Define the prop for the button position (only 'center' is relevant now)
type ButtonPosition = 'center'; 

const AidMap: React.FC = () => {
  const { t } = useLanguage(); 

  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const fetchHospitals = useCallback(async (lat: number, lng: number) => {
    try {
      setHospitals([]);
      setLoading(true);
      
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
      console.error("Overpass API error:", error);
    }
    setLoading(false);
  }, []); 

  const getLocationAndFetch = useCallback(async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert(t('alert_location_denied' as any));
        router.back();
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
      await fetchHospitals(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      console.error('Location error:', error);
      setLoading(false);
    }
  }, [fetchHospitals, t, router]);

  useEffect(() => {
    getLocationAndFetch();
  }, [getLocationAndFetch]);

  // 💡 Simplified RefreshButton: only needs to render in the center style now.
  const RefreshButton = () => (
    <View style={styles.refreshButtonContainerCenter}>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={getLocationAndFetch}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="refresh" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading && hospitals.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{ marginTop: 10 }}>{t('loading_hospitals_text' as any)}</Text>
      </View>
    );
  }

  // 💡 This is the ONLY place the RefreshButton is rendered.
  if (hospitals.length === 0 && !loading) {
    return (
      <View style={styles.loading}>
        <Text>{t('no_hospitals_found' as any)}</Text>
        <RefreshButton /> 
      </View>
    );
  }

  // 💡 Pull translated strings for use inside the HTML template
  const youAreHere = t('map_popup_you_are_here' as any);
  const nearestHospital = t('map_popup_nearest_hospital' as any);
  const defaultHospitalClinic = t('map_popup_hospital_clinic' as any);

  // HTML content for the WebView using Leaflet
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <style>
          #map { height: 97vh; width: 100%; } 
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
          
          // Current location marker (uses translated string)
          L.marker([${latitude}, ${longitude}]).addTo(map).bindPopup('${youAreHere}').openPopup();
          
          var hospitals = ${JSON.stringify(hospitals)};
          
          if(hospitals.length > 0){
            var nearest=hospitals[0];
            
            // Nearest Hospital Marker 
            L.marker([nearest.lat,nearest.lon],{icon:L.icon({
              iconUrl:'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              iconSize:[32,32]
            })}).addTo(map).bindPopup(nearest.tags?.name || '${nearestHospital}').openPopup();
          }
          
          // Other Hospitals/Clinics Markers 
          for(var i=1; i<hospitals.length; i++){
            var h=hospitals[i];
            L.marker([h.lat,h.lon],{icon:L.icon({
              iconUrl:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              iconSize:[32,32]
            })}).addTo(map).bindPopup(h.tags?.name || '${defaultHospitalClinic}');
          }
        </script>
      </body>
    </html>
  `;

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        {/* Main Content (Map and List) */}
        <View style={{ flex: 1 }}>
          {/* Top half is the map */}
          <WebView 
            originWhitelist={['*']} 
            source={{ html }} 
            style={{ flex: 1 }} 
          />
          
          {/* Bottom half is the list */}
          <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
            
            <View style={styles.titleContainer}>
                <Ionicons name="location" size={20} color="red" />
                <Text style={styles.titleText}>
                  {t('title_nearby_facilities'  as any)}
                </Text>
            </View>

            <FlatList
              ref={flatListRef}
              data={hospitals}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.listItem,
                    index === 0 ? styles.nearestHighlight : {},
                  ]}
                >
                  <Text style={{ fontWeight: 'bold' }}>{item.tags?.name || t('default_hospital_name' as any)}</Text>
                  <Text>{item.tags?.amenity || t('unknown_type' as any)}</Text>
                  <Text style={styles.distanceText}>{item.distance?.toFixed(2)} {t('distance_unit' as any)}</Text>
                </View>
              )}
            />
            
            {/* The refresh button is NOT rendered here */}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AidMap;

const styles = StyleSheet.create({
  loading: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
    paddingTop: 5,
  },
  titleText: {
    fontWeight: 'bold', 
    fontSize: 18, 
    marginLeft: 8, 
  },
  listItem: { 
    paddingVertical: 10, 
    paddingHorizontal: 5,
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
  },
  nearestHighlight: {
    backgroundColor: '#ffe6e6', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff6666',
  },
  distanceText: {
    color: '#333',
    fontWeight: '500',
    marginTop: 2,
  },
  // 💡 Only the center style is needed for the container now
  refreshButtonContainerCenter: {
    alignSelf: 'center', 
    marginTop: 15,
  },
  // 💡 Reusable button style
  refreshButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  // 💡 Removed unused refreshButtonContainerBottomRight style
});