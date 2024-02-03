import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet, Modal } from 'react-native'
import React, {createContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, ArrowUpCircleIcon } from 'react-native-heroicons/outline';
import { Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../../components/Recipes/loading';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { useRoute } from '@react-navigation/native';
    

const ios = Platform.OS=='ios';

export default function RecipeDetail(props) {
    let item = props.route.params;
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visible , setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(()=>{
        getMealData(item.idMeal);
    },[])

    const getMealData = async (id)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //   console.log('got meal data: ',response.data);
          if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error: ',err.message);
        }
    }

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }

    const handleOpenLink = url=>{
        Linking.openURL(url);
    }

  return (
    <View style={styles.container}>
        <StatusBar style={"light"} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
        >
        
        {/* recipe image */}
        <View style={styles.recipeImage}>
            <CachedImage
                uri={item.strMealThumb}
                style={styles.therecipeimage}
            />
        </View>

        {/* back button */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles.nameandareacontainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.nameandareabutton}>
                <ChevronLeftIcon size={hp(5.5)} strokeWidth={5.5} color="#FF914D" />
            </TouchableOpacity>

        </Animated.View>

        {/* meal description */}
        {
            loading? (
                <Loading size="large" className="mt-16" />
            ):(
                <View style={styles.secondaryContainer}>
    {/* name and area */}
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                    <Text style={styles.nameText}>{meal?.strMeal}</Text>
                    </Animated.View>

                    {/* misc */}
                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={styles.miscscontainer}>
                        <View className="flex rounded-full" style={styles.miscitemContainer}>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={styles.misctext}>
                                    35
                                </Text>
                                <Text style={styles.misctextbelow}>
                                    Mins
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full" style={styles.miscitemContainer}>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={styles.misctext}>03</Text>
                                <Text style={styles.misctextbelow}>
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full" style={styles.miscitemContainer}>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <FireIcon size={hp(4)} strokeWidth={2.5} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={styles.misctext}>
                                    103
                                </Text>
                                <Text style={styles.misctextbelow}>
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full " style={styles.miscitemContainer}>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="black" />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={styles.misctext}>
                                    
                                </Text>
                                <Text style={styles.misctextbelow}>
                                    Easy
                                </Text>
                            </View>
                        </View>
                    </Animated.View>



                    {/* Make this modal */}
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible);
                        }}
                    >
                    <ScrollView
                    contentContainerStyle={styles.modalContentContainer}
                    showsVerticalScrollIndicator={false}
                    >


                    {/* ingredients */}
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={styles.ingredientmaincontainer}>
                    <Text style={styles.ingredientheaderText}> Ingredients </Text>
                    <View style={styles.ingredientcontainer}>
                        {ingredientsIndexes(meal).map((i) => (
                    <View key={i} style={styles.ingredientItem}>
                        <View style={styles.ingredientdot} />
                    <View style={styles.ingredienttextContainer}>
                        <Text style={styles.ingredientmeasureText}>{meal['strMeasure' + i]}  </Text>
                        <Text style={styles.ingredientText}>{meal['strIngredient' + i]}  </Text>
                        </View>
                    </View>
                    ))}
                </View>
                    </Animated.View>

                
                    {/* instructions */}
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-5">
                    <Text style={styles.instructionsheaderText}> Instructions </Text>
                    <Text style={styles.instructionsText}>
                        {meal?.strInstructions}
                    </Text>

                    </Animated.View>

                    {/* recipe video */}
                    {meal.strYoutube && (
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                                <Text style={styles.videoheaderText}> Recipe Video </Text>
                            <View style={styles.videoContainer}>
                            <TouchableOpacity onPress={() => handleOpenLink(meal.strYoutube)} style={styles.linkContainer}>
                                <Text style={styles.linkText}>{meal.strYoutube}</Text>
                            </TouchableOpacity>
                            </View>
                        </Animated.View>
                        )
                    }
{/* adasd */}
</ScrollView>
<TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>


      </Modal>
      <View style={styles.clicktoosee}>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.FooterButton}>
        <Text style={styles.footerText}>Click for Ingredients</Text>
        </TouchableOpacity>
        </View>
        </View>
            )
        }


        </ScrollView>



    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
      },

      secondaryContainer: {
        paddingHorizontal: 2,
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 12,
        marginBottom: 10, 
      },

////

miscIconContainer: {
    height: hp(6.5),
    width: hp(6.5),
    backgroundColor: 'white',
    borderRadius: hp(6.5) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },


    recipeImage: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    therecipeimage: {
      width: wp(100),
      height: hp(50),
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },

    nameandareacontainer: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: hp(14),
      },
      nameandareabutton: {
        padding: 5,
        marginTop: -100,
        borderRadius: hp(3.5),
        marginLeft: 15,
        backgroundColor: 'white',
      },

      nameText: {
        fontSize: hp(3),
        fontWeight: 'bold',
        flex: 1,
        color: 'black', 
        marginBottom: 20,
        marginHorizontal: 10
      },


      miscscontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
      },
///

    ingredientmaincontainer: {
        marginVertical: hp(2),
        paddingHorizontal: hp(3),
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: hp(2), 
        backgroundColor: "#FF914D",
    },

    ingredientheaderText: {
        fontSize: hp(2.6),
        fontWeight: 'bold',
        flex: 1,
        color: 'black', 
        marginBottom: 10,
        marginTop: 10,
    },

    ingredientcontainer: {
        marginLeft: hp(3),
        marginBottom: hp(2),
        
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    ingredientdot: {
        height: hp(1.5),
        width: hp(1.5),
        backgroundColor: 'black', 
        borderRadius: hp(1.5) / 2,
    },
    ingredienttextContainer: {
        flexDirection: 'row',
        marginLeft: hp(2),
    },
    ingredientmeasureText: {
        fontSize: hp(1.9),
        fontWeight: 'bold',
        color: 'black', 
    },
    ingredientText: {
        fontSize: hp(2),
        fontWeight: 'normal',
        color: 'black', 
    },

    instructionsheaderText: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: 'black', 
    },
    instructionsText: {
        fontSize: hp(1.8),
        fontWeight: 'bold',
        marginHorizontal: 5,
        textAlign: 'justify',
        color: 'black', 
    },

    videoheaderText: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black', 
    },
    videoContainer: {
        flex: 1,
    },
    linkContainer: {
        marginBottom: hp(5),
    },
    linkText: {
        fontSize: hp(2),
        color: '#0066cc', 
        marginLeft: 10,
    },

    miscitemContainer: {
        borderRadius: 10,
        backgroundColor: '#FF914D',
        padding: 8
      },
    
      misctext: {
        fontSize: hp(2), 
        fontWeight: 'bold', 
        color: 'black', 
      },
      misctextbelow: {
        fontSize: hp(1.6), 
        fontWeight: 'bold',
        color: 'black', 
      },

      tabsContainer: {
        flexDirection: 'row',
        marginTop: -70,
        marginLeft: -20,
        alignSelf: 'center'
      },

      activeTab: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
      },
      tabText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        marginLeft: 30,
        color: 'white',
        backgroundColor: 'black',
      },

      FooterButton:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 3, 
        borderColor: 'white',
        borderRadius: 20,
        ////
        padding: hp(1.5),
        marginTop: hp(1),
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColor: '#FF914D',
      },
      footerText:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: hp(3),
      },


//////////////////////
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: hp(2),
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContentContainer: {
    backgroundColor: '#FFF',
    borderRadius: hp(2),
    padding: hp(2),
  },

  modalCloseButtonText: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'white',
  },

  modalCloseButton: {
    padding: hp(1.5),
    marginTop: hp(2),
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#FF914D',
    backgroundColor: '#FF914D',
  },

  });