import {StatusBar} from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import ClickIcon from 'react-native-vector-icons/FontAwesome';
import TickIcon from 'react-native-vector-icons/Ionicons';

import { CameraType } from 'expo-camera/build/Camera.types';


const CameraScreen=({navigation})=> {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera ,setCamera] = useState(null);
  const [image,setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const nextScreen = () => {
    if(image==null){
      alert("Please Take a picture on clicking camera button");
    }else{
      navigation.navigate("Location");
    }
    
  };

  useEffect(() => {
      
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const storeData = async (value) => {
    try { 
      await AsyncStorage.setItem('userphoto', value)
    } catch (e) {
      // saving error
    }
  }

  const takePicture=async()=>{
    if(camera){
      const data = await camera.takePictureAsync()
      setImage(data.uri);
      storeData(data.uri); 
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }




  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref=> setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        // ratio={'1:1'}
        />
      </View>
      {image && <Image source ={{uri:image}} style={{width:150,height:150,borderRadius:100,marginTop:-50}}/>} 
      <View style={styles.ButtonContainer}>
        
        <TouchableOpacity
          style={styles.clickButton}
          onPress={()=>takePicture()}>
            <ClickIcon name="camera" size={40} style={{color:"#ffffff"}}></ClickIcon>
             
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tickButton}
          onPress={nextScreen}>
            <TickIcon name="checkmark-sharp" size={40} style={{color:"#ffffff",}}></TickIcon>
             
        </TouchableOpacity>
        
      </View>    
      
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    // flex: 1,
    flexDirection:"row",
    

  },
  ButtonContainer:{
    // height:700,
    // width:"100%",
    alignItems:"flex-start",
    justifyContent:"center",
    flexDirection:"row",
    // position:"relative",
    marginTop:10,
  },
  fixedRatio:{
    // flex:1,
    aspectRatio:0.75,
    height:550,
  },


  chooseCameraButton:{
    // position:"absolute",
    // top:"100%",
    // backgroundColor:"#555eee",
    borderWidth:2,
    borderColor:"#555eee",
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:50,
    marginBottom:10,
    // width:"50%",
    // bottom:10,
  },
  clickButton:{
    // top:"90%",
    backgroundColor:"#555eee",
    paddingHorizontal:10,
    paddingVertical:10,
    alignItems:"center",
    justifyContent:"center",
    width:65,
    height:65,
    borderRadius:50,
    marginHorizontal:10,
  },
  tickButton:{
    backgroundColor:"#2cb978",
    paddingHorizontal:10,
    paddingVertical:10,
    alignItems:"center",
    justifyContent:"center",
    width:65,
    height:65,
    borderRadius:50,

  }

  
});