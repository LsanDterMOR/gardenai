import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Camera, PermissionStatus } from "expo-camera";
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

const GardenaiCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [base64Image, setBase64Image] = useState<string |null>();
  const cameraRef: React.LegacyRef<Camera> | null = React.useRef(null);
  const [imgPath, setImgPath]= useState<string | null>();
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  
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
    console.log("base64Image => ", base64Image)
    setImgPath(photo?.base64);
  };
  const retakePicture = () => {
    setBase64Image(null);
    
  }
  const savePhoto = async() => {
    console.log(imgPath);
  }

  const onPress = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    const { x, y, translationX, translationY } = event.nativeEvent;
    console.log("x ", x);
    console.log("y ", y);
    if (!start) setStart({ x: y, y: x });
    setDimensions({ w: translationX, h: translationY });
    
  };

  const onEnd = () => {
    console.log("onEnd")
    if (!start) return;

    setEnd(start);
    setStart(null);
  };

  return (
    <View style={styles.container}>
      {base64Image && (<ImageBackground style={styles.image} source={{ uri: base64Image }} />) ? (
        <View>
            <View>
              <PanGestureHandler onGestureEvent={onPress} onEnded={onEnd}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>

                <ImageBackground style={styles.image} source={{ uri: base64Image }}>
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: "blue",
                      top: start?.x ?? end?.x,
                      left: start?.y ?? end?.y,
                      width: dimensions?.w ?? 0,
                      height: dimensions?.h ?? 0,}}
                />
                </ImageBackground>
                </View>
            </PanGestureHandler>
          </View>
          
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}>
                <Text style={{ color: '#000', fontSize: 20}}>
                  Re-take
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20
                  }}>
                  save photo
                </Text>
            </TouchableOpacity>          
          </View>
        </View>
      ) : (
        <Camera type={type} style={styles.camera} ref={cameraRef}>
        <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text> Flipendo </Text>
          </TouchableOpacity>
          <View
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={takePicture}
                style={{ width: 75, height: 75, borderRadius: 50,backgroundColor: '#fff'}}/>
          </View>
      </Camera>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#FFF9F5"

  },

  camera: {
    height: "100%",
  },

  image: {
    height: "95%",
  },
});

export default GardenaiCamera;