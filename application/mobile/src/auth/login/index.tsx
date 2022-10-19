import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import LogoIcon from "../src/LogoIcon";
import LoginBtn from "../src/LoginBtn";
import { useUser } from "../../store/user";

interface LoginProps {
  navigation: any;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [isError, setIsError] = useState(false);
  const moveToRegister = () => props.navigation.navigate("Register");
  const moveToGardenai = () => props.navigation.navigate("Gardenai");
  const setUser = useUser((state) => state.setUser);

  const startLogin = async () => {
    try {
      if (isEmail) {
        const login = await fetch(
          "https://gardenai-backend.herokuapp.com/api/v1/user/signin",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        ).then((r) => r.json());
        if (login.result === undefined) {
          setIsError(true);
          console.log("User id is undefined");
          return;
        }
        if (login.success) {
          setUser({ id: login.result.id });
          setIsError(false);
          console.log("Login success");
          moveToGardenai();
        } else {
          console.log("Login failed");
          setIsError(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  function validateEmail(text: React.SetStateAction<string>) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmail(text);
      setIsEmail(false);
    } else {
      setEmail(text);
      setIsEmail(true);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <LogoIcon height={150} width={274.23} />
        </View>
        <TextInput
          style={styles.Input}
          placeholder="email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          onChangeText={(text) => validateEmail(text)}
        />
        <TextInput
          style={styles.Input}
          secureTextEntry={true}
          placeholder="password"
          placeholderTextColor="#000"
          onChangeText={setPassword}
        />
        {!isEmail ? (
          <Text style={styles.errorText}>Ceci n'est pas un mail valide</Text>
        ) : null}
        {isError ? (
          <Text style={styles.errorText}>Email ou mot de passe invalide</Text>
        ) : null}

        <View style={styles.loginBtn}>
          <LoginBtn eventPush={startLogin} />
        </View>
        <Text onPress={moveToRegister} style={styles.register}>
          Vous n'avez pas encore de compte ?
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFBF9",
  },
  errorText: {
    color: "red",
    marginBottom: "5%",
  },
  Input: {
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "80%",
    minHeight: "5%",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    paddingLeft: 20,
    marginBottom: "5%",
  },
  logo: {
    marginStart: "7.5%",
    marginBottom: "10%",
    //   borderWidth:0,
  },
  register: {
    textDecorationLine: "underline",
    color: "black",
  },
  loginBtn: {
    marginBottom: "5%",
  },
});

export default Login;
