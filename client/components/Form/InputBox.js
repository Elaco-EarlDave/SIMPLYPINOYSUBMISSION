import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import React from 'react'

const InputBox = ({
    placeholder,
    label,
    mode,
    autoComplete,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue,
    left,
    right,
    theme,
    icon,
  }) => {
    return (
      <View>

        <TextInput
        placeholder= {placeholder}
        label= {label}
        mode= {mode}
        theme={theme}
          style={styles.inputBox}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={(text) => setValue(text)}
          left={left}
          right={right}
        />
      </View>
    );
  };

const styles= StyleSheet.create({
    inputBox: {
        width: 300,
        marginBottom: 15,
        justifyContent: "center",
    },

});

export default InputBox