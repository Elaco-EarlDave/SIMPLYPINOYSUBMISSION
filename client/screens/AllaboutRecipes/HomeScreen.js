import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../../components/Recipes/categories';
import axios from 'axios';
import Recipes from '../../components/Recipes/recipes';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.backgroundContainer}>
        <View style={styles.barcode}>
                  </View>

            <View style={styles.logoContainer}>
            <Image source={require('../../assets/logos/LogoWhite.png')} style={styles.logoImage} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-circle-left" size={30} color="white" />
          <Text style={styles.textStyle}>Go Back</Text>
            </TouchableOpacity>
              
            </View>
        </View>
          <Text style={styles.browseRecipesText}>Look for some Recipes</Text>
        <StatusBar style="dark" />
        <View style={styles.categoriesContainer}>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.recipesContainer}>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingBottom: 30,
    marginTop: 20,
  },
  barcode:{
    height: 20,
    alignItems: 'center',
    top: 20,
    width: "125%",

  },
  greetingsContainer: {
    marginHorizontal: wp(4),
  },
  browseRecipesContainer: {
    marginTop: hp(0.5),
    marginBottom: hp(0.5),
  },
  browseRecipesText: {
    fontSize: hp(3.8),
    fontWeight: 'bold',
    color: '#FF914D',
    textAlign: 'center',
    marginVertical: 1
  },

  categoriesContainer: {
    marginVertical: 10,
  },
  recipesContainer: {
    marginBottom: 10,
    
  },
  backgroundContainer: {
    backgroundColor: '#FF914D',
    paddingVertical: 10,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    height:200,
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },

  logoImage: {
    justifyContent: 'center',
    width: 350, 
    height: 350,
    resizeMode: 'contain',
    marginTop:-100,
  },

  backButton:{
    flexDirection: 'row',
    marginRight: '65%',
    marginTop: -120,
  },

  textStyle:{
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 10,
    color: 'white'
  }
})
