import { View, Text, StyleSheet, ScrollView, RefreshControl, Image } from "react-native";
import React from 'react'
import FooterMenu from "../../components/Menus/FooterMenu";

const About = () => {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <FooterMenu/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
  })

export default About