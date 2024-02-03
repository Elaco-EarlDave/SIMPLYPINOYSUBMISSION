import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  //logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout Successfully");
  };

  return (
    <View>
      
      <TouchableOpacity onPress={handleLogout}>
        {/* <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        /> */}
              <Text style={styles.Text}>SIGNOUT</Text>
      </TouchableOpacity>




    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
  Text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },

    //////////////

    backgroundContainer: {
      backgroundColor: '#FF914D',
      paddingVertical: 20,
      paddingHorizontal: 4,
      justifyContent: 'space-between',
      alignItems: 'center',
      height:290,
    },

    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 180,
    },

    logoImage: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%', 
      height: 300,
      resizeMode: 'contain',
      margin:-200,
      marginTop:-190,
      // marginRight:-190,
    },
  

});

export default HeaderMenu;
