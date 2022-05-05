import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import LogoIcon from '../src/LogoIcon';
import RegisterBtn from '../src/RegisterBtn';

interface RegisterProps {
  navigation: any;
}

const Register = (props: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const moveToLogin = () => {
    props.navigation.navigate("Login")
  }


  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon 
          height={150}
          width={274.23}
        />
      </View>
      <TextInput style={styles.Input} placeholder="username" onChangeText={setUsername}></TextInput>
      <TextInput style={styles.Input} secureTextEntry={true} placeholder="password" onChangeText={setPassword}></TextInput>
      <TextInput style={styles.Input} secureTextEntry={true} placeholder="confirm password" onChangeText={setConfirmPassword}></TextInput>
      <View style={styles.loginBtn}>
        <RegisterBtn eventPush={moveToLogin}/>
      </View>
      <Text onPress={moveToLogin} style={styles.register}>Vous avez déjà un compte ?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
    backgroundColor: "#FFF9F5"
  },
  Input: {
    borderWidth:1,
    borderColor: 'rgba(54, 34, 34, 0.25)',
    minWidth: '80%',
    minHeight: '5%',
    borderRadius: 10,
    backgroundColor: '#FFF9F5',
    paddingLeft: 20,
    marginBottom : "5%"
  },
  logo: {
    marginStart:"7.5%",
    marginBottom: "10%",
  //   borderWidth:0,
  },
  register: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  loginBtn: {
    marginBottom: "5%",

  } 
});

export default Register;