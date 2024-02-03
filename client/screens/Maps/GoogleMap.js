import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import FooterMenu from "../../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";



export default function GoogleMap() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [supermarkets, setsupermarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredSupermarkets, setFilteredSupermarkets] = useState([]);
  const [isSearchFilterActive, setIsSearchFilterActive] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();


  const mapRef = useRef(null);

  Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

  const markets = [
        {
          name: "SM Supermarket - CDO Uptown",
          latitude: 8.45619963,
          longitude: 124.62353379,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

        {
            name: "Savemore Market Kauswagan",
            latitude: 8.48974055,
            longitude: 124.638898,
            latitudeDelta: 1,
            longitudeDelta: 1,
          },
          {
            name: "Gaisano Bulua Supermarket",
            latitude: 8.504017,
            longitude: 124.612928,
            latitudeDelta: 1,
            longitudeDelta: 1,
          },
        {
          name: "SM Supermarket - Cagayan Downtown Premier",
          latitude: 8.48434,
          longitude: 124.633333,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        {
          name: "The Marketplace",
          latitude: 8.496111,
          longitude: 124.633056,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        {
          name: "Robinsons Supermarket Villa Ernesto",
          latitude: 8.507778,
          longitude: 124.623056,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        {
          name: "Robinsons - Cagayan De Oro",
          latitude: 8.501111,
          longitude: 124.629722,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

        {
          name: "Puregold Lapasan - Cagayan de Oro",
          latitude: 8.48331815,
          longitude: 124.6582818,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

        {
          name: "Cogon Public Market - Cagayan De Oro",
          latitude: 8.4774301,
          longitude: 124.65153065,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

        {
          name: "Gaisano Cogon - Cagayan De Oro",
          latitude: 8.47670716,
          longitude: 124.65168625,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

        {
          name: "Gaisano Suki Club - Cagayan De Oro",
          latitude: 8.47803361,
          longitude: 124.65073675,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },

      ];


  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

      if (mapRef.current && currentLocation) {
        mapRef.current.animateToRegion(
          {
            latitude: 8.48462336,
            longitude: 124.59466249,
            latitudeDelta: 0.001,
            longitudeDelta: 0.004,
          },
          300 // Animation duration in milliseconds
        );
      }
    };
    setsupermarkets(markets);

    getPermissions();
  }, []);

  const geocode = async () => {
  const geocodedLocation = await Location.geocodeAsync(address);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: geocodedLocation[0].latitude,
          longitude: geocodedLocation[0].longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.004,
        },
        300 // Animation duration in milliseconds
      );  
    }

  };


  // Common
  const handleSearchChange = (query) => {
    setSearchTerm(query);
    const filtered = markets.filter((market) => {
      const marketName = market.name.toLowerCase();
      const queryLower = query.toLowerCase();
      return marketName.startsWith(queryLower);
    });
    setFilteredSupermarkets(filtered);
  };

  const toggleSearchFilter = () => {
    setIsSearchFilterActive(!isSearchFilterActive);
  };

  const handleMarketSelection = (market) => {
    setSelectedMarket(market);
    setAddress(market.name); // Autofill the address with the selected market name
    toggleSearchFilter(); // Close the search filter after selection
    geocode(); // Perform geocoding based on the selected market
  };



    // Render component UI
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.maps}
        initialRegion={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.04,
        } : null}
      >
        {supermarkets.map((marker, index) => (
            <Marker key={index} coordinate={marker} />
))}
        </MapView>
        <View style={styles.searchBox}>
        <Text style={styles.searchBoxLabel}>Please type your designed location</Text>
        <TextInput
          style={styles.searchBoxField}
          onChangeText={setAddress}
          autoCapitalize="sentences"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={geocode}>
          <Text style={styles.buttonLabel}>Search Assigned Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1Container} onPress={toggleSearchFilter}>
            <Text style={styles.buttonLabel}>
              {isSearchFilterActive ? 'Hide Search Filter' : 'Show Search Filter'}
            </Text>
          </TouchableOpacity>
          {/* Show/hide search filter components based on state */}
          {isSearchFilterActive && (
            <>
        <TextInput
          style={styles.searchBoxField}
          placeholder="Search for markets"
          onChangeText={handleSearchChange}
          value={searchTerm}
          autoCapitalize="sentences"
        />
        <FlatList
          data={filteredSupermarkets.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleMarketSelection(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
            </>
            
          )}          
      </View>
    </View>



    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
    margin: 10,
    borderColor: '#FF914D',
    borderWidth: 2,

  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  maps: {
    width: '100%',
    height: '100%',
  },
  searchBox:{
    position: "absolute",
    top: 0,
    width: "70%",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 5,
    alignSelf: "center",
    marginTop: 2
  },
  searchBoxField:{
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10, // Add some margin between the search box and the map
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "orange",
    borderRadius: 8,
  },

    buttonContainer:{
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      marginBottom: 5,
      backgroundColor: "orange",
      borderRadius: 8,
    },
    button1Container:{
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      backgroundColor: "orange",
      borderRadius: 8,
    },

    searchBoxLabel:{
      fontWeight: 'bold',
      textAlign: 'center'
    },


    buttonLabel:{
      fontSize: 18,
      color: "black",
    }
});