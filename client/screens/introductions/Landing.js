import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from '@expo/vector-icons'; 

const Landing = ({ navigation }) => {
  
  const handleRegularLogin = () => {
    navigation.navigate('Login');
  };

  const guestLogin = () => {
    navigation.navigate('HomeScreen');
  };  

  const handleLocate = () => {
    navigation.navigate('GoogleMap');
  };  

  return (
    <View style={styles.container}> 
      <Image source={require('../../assets/logos/FlavorQuest_Logo.png')} style={styles.image}/>
      
      <TouchableOpacity style={styles.button} onPress={handleRegularLogin}>
        <FontAwesome5 name="user-lock" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={guestLogin}>
        <FontAwesome5 name="user-secret" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}> GUEST</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLocate}>
        <Ionicons name="location-sharp" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>LOCATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  image: {
    width: 400, 
    height: 600,
    resizeMode: 'contain',
    margin: -160,
  },

  button: {
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FF914D',
    marginTop: 15
  },

  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  icon: {
    marginRight: 10,
  },
});

export default Landing;
