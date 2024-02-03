import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../../helpers/image';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({ categories, meals }) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.recipesHeading}>Recipes</Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={styles.loadingIndicator} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
    >
      <Pressable
        style={[
          styles.recipeCardContainer,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <CachedImage
          uri={item.strMealThumb}
          style={[
            styles.recipeCardImage,
            { height: index % 3 === 0 ? hp(25) : hp(35) },
          ]}
        />

        <Text style={styles.recipeCardText}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: hp(2),
    
  },
  recipesHeading: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: hp(2),
  },
  loadingIndicator: {
    marginTop: hp(20),
  },
  recipeCardContainer: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: hp(4),
    flexDirection: 'column',
  },
  recipeCardImage: {
    width: '100%',
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  recipeCardText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    marginLeft: hp(2),
    color: 'black',
  },
});

export default Recipes;


