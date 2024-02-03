import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/authContext";
import Home from "../../screens/Home";
import Register from '../../screens/authentication/Register';
import Login from "../../screens/authentication/Login";
import AnimatedIntro from "../../screens/introductions/AnimatedIntro";
import Landing from "../../screens/introductions/Landing";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Allaboutunder/Post";
import About from "../../screens/Allaboutunder/About";
import Account from "../../screens/Allaboutunder/Account";
import MyPosts from "../../screens/Allaboutunder/MyPosts";
import HomeScreen from "../../screens/AllaboutRecipes/HomeScreen";
import RecipeDetail from "../../screens/AllaboutRecipes/RecipeDetailScreen";
import GoogleMap from "../../screens/Maps/GoogleMap";


const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator initialRouteName="AnimatedIntro">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              // title: "Full Stack App",
              // headerRight: () => <HeaderMenu />,
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="Post"
            component={Post}
            // options={{
            //   headerBackTitle: "Back",
            //   headerRight: () => <HeaderMenu />,
            // }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenu /> ,
            }}
          />
          <Stack.Screen
              name="MyPosts"
              component={MyPosts}
            //   options={{
            //   headerBackTitle: "Back",
            //   headerRight: () => <HeaderMenu />,
            // }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="GoogleMap"
            component={GoogleMap}
            // options={{
            //   headerBackTitle: "Back",
            //   headerRight: () => <HeaderMenu />,
            // }}
          />
        </>
      ) : (
        <>

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="AnimatedIntro"
            component={AnimatedIntro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="GoogleMap"
            component={GoogleMap}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;






