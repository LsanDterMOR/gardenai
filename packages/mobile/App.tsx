import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Camera, PermissionStatus } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [base64Image, setBase64Image] = useState<string>();
  const cameraRef: React.LegacyRef<Camera> | null = React.useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ base64: true });
    if (photo?.base64) {
      setBase64Image("data:image/jpg;base64," + photo.base64);
    }
  };

  return (
    <View style={styles.container}>
      {base64Image && (
        <Image style={styles.image} source={{ uri: base64Image }} />
      )}
      <Button title="take photo" onPress={takePicture} />
      <View>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text> Flip </Text>
        </TouchableOpacity>
      </View>
      <Camera type={type} style={styles.camera} ref={cameraRef}></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
  },

  camera: {
    height: "40%",
  },

  image: {
    width: 250,
    height: 250,
  },
});
