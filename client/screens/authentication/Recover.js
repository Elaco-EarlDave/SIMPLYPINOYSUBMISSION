import { View, Text, Text as RNText, StyleSheet, TouchableOpacity, Image, Alert
    // Button, Alert, 
  } from "react-native";
  import React, {useState} from 'react';
  import { TextInput } from "react-native-paper";
  import InputBox from "../../components/Form/InputBox";
  import SubmitButton from "../../components/Form/SubmitButton";
  
  const Recover = ({navigation}) => {
     // states
  
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [showPass, setShowPass] = React.useState(false);
     const [loading, setLoading] = useState(false);
   
  
     //function of the login
     const handleSubmit = () => {
       try {
           setLoading(true);
           if(!email || !password){
               Alert.alert('Please FIll all Fields!');
               setLoading(false);
               return;
           }
           setLoading(false);
           console.log('Login Data==>', { email, password })
       } catch (error)
       {
           setLoading(false);
           console.log(error);
       }
     };
   
   
   
   
   
     // The UI
   return (
     <View style={styles.container}>
       <Image source={require('../../assets/logos/FlavorQuest_Logo.png')} style={styles.image}/>
   
     
     
   
     <InputBox
           placeholder="Email"
           label="Email"
           mode="outlined"
           keyboardType="email-address"
           autoComplete="email"
           value={email} 
           setValue={setEmail}
   
   
           theme={{
             colors: {
               placeholder: '#FF914D',
               text: '#FF914D',
               primary: '#FF914D',
               background: 'white',
             },
           }}
           // onChangeText={value=> setEmail(value)} 
           style={styles.inputBox}
           left={
               <TextInput.Icon
                 icon={'email-edit'}
               />
             }
           />
         
   
         <InputBox
           placeholder="Password"
           label="Password"
           mode="outlined"
           autoComplete="password"
           value={password}
           setValue={setPassword}
   
           theme={{
             colors: {
               placeholder: '#FF914D',
               text: '#FF914D',
               primary: '#FF914D',
               background: 'white',
             },
           }}
           secureTextEntry={!showPass}
           // onChangeText={value=> setPassword(value)}
           left={
               <TextInput.Icon
                 icon={'lock'}
               />
             }
           right={
             <TextInput.Icon
               icon={showPass ? 'eye' : 'eye-off'}
               onPress={() => setShowPass(!showPass)}
             />
           }
           style={styles.inputBox}
         />
   
   <SubmitButton 
           btnTitle="Submit"
           loading={loading}
           handleSubmit={handleSubmit}
         />
         <View style={styles.linkContainer}>
           <RNText style={styles.text}>Already have an Account?</RNText>
           {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}> */}
             <RNText style={styles.linkText} onPress={() => navigation.navigate("Login")}>Login</RNText>
           {/* </TouchableOpacity> */}
         </View>
   
         <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                 <Text style={styles.text}>Don't have an Account?</Text>
   
               {/* <TouchableOpacity onPress={() => navigation.navigate('Recovery')}> */}
                 <Text style={styles.linkText} onPress={() => navigation.navigate("Register")}> Register</Text> 
               {/* </TouchableOpacity> */}
               </View>
               
       </View>
     );
  }
  
  // Styles
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      image: {
        width: 400, 
        height: 600,
        resizeMode: 'contain',
        margin: -240,
      },
    
    
      linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
    
      button: {
        marginTop: 30,
        marginBottom: 15,
        width: 160,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#FF914D',
      },
      inputBox: {
        width: 300,
        marginBottom: 15,
        justifyContent: "center",
    },
      text: {
        marginTop: 5,
        color: 'black',
        marginRight: 3,
      },
    
      logintext: {
        marginTop: 5,
        color: '#FF914D',
      },
    
    
      linkText: {
        verticalAlign: 'middle',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF914D',
        marginRight: 15,
      },
  
      
  })
  export default Recover