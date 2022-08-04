import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import LogoIcon from "../src/LogoIcon";
import RegisterBtn from "../src/RegisterBtn";
import axios from "axios";
import { useUser } from "../../store/user";

interface RegisterProps {
  navigation: any;
}

const Register = (props: RegisterProps) => {
  const [error, setError] = useState(false);
  const [notSamePwd, setNotSamePwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const setUser = useUser((state) => state.setUser);

  const moveToLogin = () => {
    props.navigation.navigate("Login");
  };

  const moveToGardenai = () => props.navigation.navigate("Gardenai");

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

  const startRegister = async () => {
    try {
      if (
        password !== confirmPassword ||
        (password.length === 0 && confirmPassword.length === 0)
      ) {
        setNotSamePwd(true);
      } else {
        setNotSamePwd(false);
        const register = await axios.post(
          // "http://localhost:4000/api/v1/user/signup",
          "https://gardenai-backend.herokuapp.com/api/v1/user/signup",
          {
            email: email,
            password: password,
          }
        );
        if (register.status == 200) {
          setError(false);
          startLogin();
        } else {
          setError(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const startLogin = async () => {
    try {
      const login = await fetch(
        // "http://127.0.0.1:4000/api/v1/user/signin",
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
      setUser({ id: login.result.id });
      if (login.success) {
        moveToGardenai();
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          onChangeText={(text) => validateEmail(text)}
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          style={styles.Input}
          secureTextEntry={true}
          placeholder="password"
          placeholderTextColor="#000"
          onChangeText={setPassword}
        ></TextInput>
        <TextInput
          style={styles.Input}
          secureTextEntry={true}
          placeholder="confirm password"
          placeholderTextColor="#000"
          onChangeText={setConfirmPassword}
        ></TextInput>
        <View style={styles.loginBtn}>
          <RegisterBtn eventPush={startRegister} />
        </View>
        {notSamePwd ? (
          <Text style={{ color: "red" }}>
            Vous avez des mots de passe différent
          </Text>
        ) : null}
        {!isEmail ? (
          <Text style={{ color: "red" }}>Ceci n'est pas un mail valide</Text>
        ) : null}
        {error ? (
          <Text style={{ color: "red" }}>le mot de passe n'est pas valide</Text>
        ) : null}

        <Text onPress={moveToLogin} style={styles.register}>
          Vous avez déjà un compte ?
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
    backgroundColor: "#FFF9F5",
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

export default Register;
