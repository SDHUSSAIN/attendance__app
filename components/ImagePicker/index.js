import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function UserImagePicker({userImagePath}) {
  
  const [image,setImage] = useState(null);
  var userMobile;
  var userImage;
  console.log(userImagePath);

  const getUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');  
      let parsed = JSON.parse(user);  
      return parsed ; 
    }catch(e) {
        console.log(e);
    }

}

  useEffect(() => {
    setImage(userImagePath);
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

   

    if (!result.cancelled) {

      const base64 = await FileSystem.readAsStringAsync(result.uri, { 'encoding': FileSystem.EncodingType.Base64 });
      
      setImage(result.uri);
         
      userImage = base64 ;
        getUserData().then((res)=>{
            let subDomain = res.subDomain;
            userMobile = res.userMobile;
    
            axios.post(`https://${subDomain}.vaimssolutions.com/api/EmployeeProfileApi`,{
              mobile:userMobile,
              image:userImage
            }).then((res) =>{
              let imagePath = `https://${subDomain}.vaimssolutions.com/uploads/employeephoto/${res.data.imagename}` ;
                         
            }).catch ((error) =>{
                console.log(error);
                alert("We are busy please try again later");
            });
        }).catch((err)=>{
            console.log(err);
    
        });
    };
    
    
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image source={{ uri: image }} style={{ width: 150, height: 150,borderRadius:100,borderWidth:1,borderColor:"#555eee" }} />
      <TouchableOpacity  onPress={pickImage} ><Ionicons name="add-circle" size={64} color="#555eee"></Ionicons></TouchableOpacity>
      
    </View>
  );
}
