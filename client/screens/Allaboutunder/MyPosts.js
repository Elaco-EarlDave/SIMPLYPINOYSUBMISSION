import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import FooterMenu from "../../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../../components/Cards/PostCard";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const MyPosts = () => {
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //initial
  useEffect(() => {
    getUserPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  


  return (
    <View style={styles.container}>
      <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh} />
              }>
      
        <PostCard posts={posts} myPostScreen={true} styles={styles.postCardStyle}/>
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    justifyContent: "space-between",
    backgroundColor: '#FF914D',

  },

  postCardStyle: {
    
  },
});
export default MyPosts;
