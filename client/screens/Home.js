import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, TextInput, Pressable, TouchableOpacity, Button } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Feather } from '@expo/vector-icons';
import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/postContext"; 
import PostCard from "../components/Cards/PostCard";
import Categories from "../components/Recipes/categories";
import { Modal } from "react-native-paper";
import Recipes from "../components/Recipes/recipes";
import EditModal from "../components/Cards/EditModal";

const Home = ({ navigation }) => {
//global state
  /////// COMMANDS FROM FIRST APP
  const [isHomeActive, setHomeActive] = useState(true);
  const [posts, getAllPosts] = useContext(PostContext);
  const [activeTab, setActiveTab] = useState('Home');
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {}, 
  [getAllPosts]);



  const handleHomeTabPress = (TabName) => {
    setActiveTab(TabName);
    setHomeActive(true);
    }
    const handleSearchTabPress = (TabName) => {
    setActiveTab(TabName);
    setHomeActive(false);
    } 
  const handleIngredients = () => {
    navigation.navigate('HomeScreen');
  };

//refresh 
const onRefresh = useCallback(() => {
  setRefreshing(true);
  getAllPosts;
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);




////////////////////////
return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logos/LogoWhite.png')} style={styles.logoImage} />
          </View>
  
          <View style={styles.tabsContainer}>
            <Text
              style={[styles.tabText, activeTab === 'Home' && styles.activeTab]}
              onPress={() => handleHomeTabPress('Home')}>
              Home
            </Text>
            <Text
              style={[styles.tabText, activeTab === 'Ingredient' && styles.activeTab]}
              onPress={() => handleSearchTabPress('Ingredient')}>
              Ingredients
            </Text>
          </View>
        </View>
{!isHomeActive && (
  <View style={styles.container}>
    <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={onRefresh} />
            }>
    
    
    
    <View style={styles.Engcontainer}> 
        <TouchableOpacity style={styles.buttontoengredients} onPress={handleIngredients}>
          <Text style={styles.buttonTextE}>BROWSE RECIPES</Text>
        </TouchableOpacity>
    </View>

    </ScrollView>
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <FooterMenu style={styles.footer}/>
    </View>
  </View>
    )} 

{isHomeActive && (
<View style={styles.container}>
       <ScrollView

       //MAO NING SA PAG DISPLAYYY
        refreshControl={<RefreshControl refreshing={refreshing} 
        onRefresh={onRefresh} />
        }>
        <PostCard posts={posts} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>


        <FooterMenu />
      
      </View>
</View>
)}
        </View>
  
    );
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
  
  container: {
    flex: 1,
  //   margin: 10,
    justifyContent: "space-between",

  },

  Engcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },


  buttontoengredients: {
    padding:20,
    margin:35,
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FF914D',
  },



  buttonTextE: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },




    backgroundContainer: {
      backgroundColor: '#FF914D',
      paddingVertical: 20,
      paddingHorizontal: 4,
      justifyContent: 'space-between',
      alignItems: 'center',
      height:250,
    },
  
    profileContainer: {
      marginTop: 35,
      marginLeft: 325,
    },
  
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      // marginBottom: 10,
    },
  
    logoImage: {
      justifyContent: 'center',
      width: 350, 
      height: 500,
      resizeMode: 'contain',
      margin:-200,
      marginTop:-150,
      // marginRight:-190,
    },
  
    tabsContainer: {
      flexDirection: 'row',
      marginTop: -70,
      marginLeft: -20,
    },
  
    tabText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
      marginLeft: 30,
      color: 'white',
    },
  

  
    backButton: {
      position: 'absolute',
      top: 60,
      left: 40,
    },
  
    activeTab: {
      borderBottomColor: 'white',
      borderBottomWidth: 1,
    },
  
    divider: {
      height: 0.5,
      width: '100%',
      backgroundColor: 'lightgray',
      marginVertical: 10,
    },
  
    avatarpost: {
      width: 70, 
      height: 70, 
      borderRadius: 20, 
      marginRight: 10,
    },
  
    postsContainer: {
      height: '80%',
      width: '100%',
    },
  
  
  
    usernamepost: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 20,
    },
  
    username: {
      marginLeft: 5,
      fontWeight: 'bold',
    },
  
    timestamp: {
      marginTop: 5,
      color: 'black',
      marginLeft: 22,
    },
  
    caption: {
      marginTop: 5,
      fontSize: 18,
      marginLeft: 22,
    },
  
    actions: {
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 2,
    },
  
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      marginLeft: 22,
    },
  
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 22,
    },
  

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '90%',
      height: '70%',
    },
  

    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  
    postInput: {
      backgroundColor: 'lightgray',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    },
    
    Searchcontainer: {
      marginTop: 10,
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      backgroundColor: 'white',
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    Searchinput: {
      flex: 1,
      fontSize: hp(2.5),
      marginBottom: 1,
      paddingLeft: 3,
      // letterSpacing: 1,
    },
    searchIconContainer: {
      backgroundColor: '#FF914D',
      borderRadius: 999,
      padding: 8,
    },
  
    categoriescontainer:
    {
      marginTop: 15,
      marginBottom: 15,
    },
    allpostscontainer: {
      marginTop: 15,
      marginBottom: 15,
    }
  ,
  
    plusButtonContainer: {
      top: 35,
      paddingLeft: 80,
    },
  
    clickablesee: {
      flex: 1,
      bottom: 65,
      paddingLeft: 280,
      
    },
  
//////////////////
postcontainer: {
flex: 1,
margin: 10,
marginTop: 40,

},
heading: {
fontSize: 25,
fontWeight: "bold",
textTransform: "uppercase",
},
postinputBox: {
backgroundColor: "#ffffff",
textAlignVertical: "top",
paddingTop: 10,
width: 320,
marginTop: 30,
fontSize: 16,
paddingLeft: 15,
borderColor: "gray",
borderWidth: 1,
borderRadius: 10,
},
postBtn: {
backgroundColor: "#FF914D",
width: 300,
marginTop: 30,
height: 40,
borderRadius: 5,
alignItems: "center",
justifyContent: "center",
},
postBtnText: {
color: "black",
fontSize: 18,
fontWeight: "bold",
},

footer: {
backgroundColor: "#FF914D",

},

roundButton: {
  position: 'absolute',
  bottom: 100,
  right: 30,
  backgroundColor: '#FF914D', 
  borderRadius: 50,
  padding: 15,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3,
},
  })

export default Home;

