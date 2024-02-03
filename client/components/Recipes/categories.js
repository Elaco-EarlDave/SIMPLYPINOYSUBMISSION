import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../../helpers/image';
import { categoryData } from '../../constants';

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat, index) => {
          const isActive = cat.strCategory === activeCategory;
          const activeButtonClass = isActive ? styles.activeButton : styles.inactiveButton;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryButton}
            >
              <View style={activeButtonClass}>
                <CachedImage uri={cat.strCategoryThumb} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your container styles...
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: hp(1), // Adjust as needed
  },
  activeButton: {
    backgroundColor: '#FF914D',
    padding: hp(1.5),
    borderRadius: hp(2),
  },
  inactiveButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: hp(1.5),
    borderRadius: hp(2),
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    fontSize: hp(1.6),
    color: 'black', // Change as needed
  },
});

export default Categories;
