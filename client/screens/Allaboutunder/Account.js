import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Touchable,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
  } from "react-native";
  import React, { useContext, useState } from "react";
  import { AuthContext } from "../../context/authContext";
  import FooterMenu from "../../components/Menus/FooterMenu";
  import axios from "axios";
  const Account = () => {
    //global state
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
    //local state
    const [name, setName] = useState(user?.name);
    const [businessname, setBusinessname] = useState(user?.businessname);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] = useState(false);
  
    //handle update user data
    const handleUpdate = async () => {
      try {
        setLoading(true);
        const { data } = await axios.put("/auth/update-user", {
          name,
          businessname,
          password,
          email,
        });
        setLoading(false);
        let UD = JSON.stringify(data);
        setState({ ...state, user: UD?.updatedUser });
        alert(data && data.message);
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
        console.log(error);
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: "https://clipart-library.com/images_k/batman-head-silhouette/batman-head-silhouette-4.png",
              }}
              style={{ height: 200, width: 200, borderRadius: 100 }}
            />
          </View>
          <Text style={styles.warningtext}>
          You Can Only Update Your Name, Business Name And Password*
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              style={styles.inputBox}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>
              <Text>Business Name</Text>
              </Text>
            <TextInput
              style={styles.inputBox}
              value={businessname}
              onChangeText={(text) => setBusinessname(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput style={styles.inputBox} value={email} editable={false} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              style={styles.inputBox}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Role</Text>
            <TextInput
              style={styles.inputBox}
              value={state?.user.role}
              editable={false}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.updateBtn} 
            onPress={handleUpdate}
            >
              <Text style={styles.updateBtnText}>
                {loading ? "Please Wait" : "Update Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <FooterMenu />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      justifyContent: "space-between",
      
      
    },
    warningtext: {
      color: "red",
      fontSize: 13,
      textAlign: "center",
    },
    inputContainer: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      
    },
    inputText: {
      fontWeight: "bold",
      width: '30%',
      color: "gray",
    },
    inputBox: {
      width: 220,
      backgroundColor: "#ffffff",
      marginLeft: 10,
      fontSize: 16,
      paddingLeft: 20,
      height: 30,
      borderRadius: 5,
    },
    updateBtn: {
      backgroundColor: "#FF914D",
      color: "white",
      height: 40,
      width: 250,
      borderRadius: 10,
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    updateBtnText: {
      color: "#ffffff",
      fontSize: 16,
    },
  });
  export default Account;
  
  
  
  