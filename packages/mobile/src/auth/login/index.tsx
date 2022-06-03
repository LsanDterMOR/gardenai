import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import LogoIcon from '../src/LogoIcon';
import LoginBtn from '../src/LoginBtn';

interface LoginProps {
  navigation: any;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(true);

  const moveToRegister = () => props.navigation.navigate("Register")
  const moveToGardenai = () => props.navigation.navigate("Gardenai")

  function validateEmail(text: React.SetStateAction<string>) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      setEmail(text);
      setIsEmail(false)
    }
    else {
      setEmail(text);
      console.log("Email is Correct");
      setIsEmail(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon 
          height={150}
          width={274.23}
        />
      </View>
      <TextInput style={styles.Input} placeholder="email" placeholderTextColor="#000" keyboardType="email-address" onChangeText={text => validateEmail(text)}></TextInput>  
      <TextInput style={styles.Input} secureTextEntry={true} placeholder="password" placeholderTextColor="#000" onChangeText={setPassword}></TextInput>
      {
        !isEmail ? <Text style={styles.errorText}>Ceci n'est pas un mail valide</Text> : null
      }
      <View style={styles.loginBtn}>
        <LoginBtn eventPush={moveToGardenai}/>
      </View>
      <Text onPress={moveToRegister} style={styles.register}>Vous n'avez pas encore de compte ?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
    backgroundColor: "#FFFBF9"
  },
  errorText: {
    color: 'red',
    marginBottom : "5%",
  },
  Input: {
    borderWidth:1,
    borderColor: 'rgba(54, 34, 34, 0.25)',
    minWidth: '80%',
    minHeight: '5%',
    borderRadius: 10,
    backgroundColor: '#FFF9F5',
    paddingLeft: 20,
    marginBottom : "5%",
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

export default Login;
