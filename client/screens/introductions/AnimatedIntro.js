import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedIntro = ({ navigation }) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => (ring1padding.value = withSpring(ring1padding.value + hp(5))), 100);
    setTimeout(() => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))), 200);

    setTimeout(() => navigation.navigate('Landing'), 4000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: ring2padding }}>
        <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: ring1padding }}>
          <Image source={require('../../assets/logos/logoguro.png')} style={styles.image} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
image:{
    width: hp(40),
     height: hp(20)
},
  
});

export default AnimatedIntro;
