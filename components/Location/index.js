import React, { useEffect, useState } from 'react';
import axios  from "axios";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Text, View,TouchableOpacity,ActivityIndicator } from 'react-native';
import styles from './style';






let apiKey = 'AIzaSyDcp-Lbw5bftCto6bM-S4xMXvq1TQ2J5iU';



import * as Location from 'expo-location';




const LocationScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [getLocation,setGetLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [userLatitude,setUserLatitude] = useState(0);
  const [userLongitude,setUserLongitude] = useState(0);
  // const [visibility,setVisibility] = useState(true);
  
  const [timeCheck,setTimeCheck] = useState(true);
  
  
//to get location on load
  useEffect(() => {
    console.log("hello");

    (async () => {
      console.log("hello again");
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      
      Location.setGoogleApiKey(apiKey);
      
      console.log(status);
      let { coords } = await Location.getCurrentPositionAsync();
      // let location2 = await Location.getCurrentPositionAsync({});
      console.log("hello again2");

      setLocation(coords);
      // console.log(location2);
      
      if (coords.latitude !==0) {
        let { longitude, latitude } = coords;
        setUserLatitude(latitude);
        setUserLongitude(longitude);
        setGetLocation(true);
        
        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        // console.log(regionName, 'nothing');
      }
      // console.log();
    })();
    
  }, []);
//to navigate user to next screen
  const nextScreen = () =>{
    // setGetLocation(!getLocation);
    alert("Thanks we have received your attendance")

    navigation.navigate("Home");
  }
  
  var InTime=0;
  var OutTime=0;
  var newtextLocation="";
  var checkInId=0;
  var newmobileNo;
  var newsubDomain;
  var userphoto;

//to get address details
  const getNewLocation = ()=>{
    newtextLocation = `${address?.["name"]} ${address?.["district"]} ${address?.["subregion"]} ${address?.["region"]} Pincode:${address?.["postalCode"]} Country:${address?.["country"]}`;
  }
//to get in time attandence
  const getInTime =()=>{
    var d = new Date();
    var datestring = d.getFullYear()+ "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    
    InTime = datestring;
   
    getNewLocation();
    sendInData();
    nextScreen();
    
    
  }
//to get out time attandence
  const getOutTime =()=>{
    var d = new Date();
    var datestring = d.getFullYear()+ "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    OutTime = datestring;
    
    getNewLocation();
    getData();
    // sendOutData();
    setTimeCheck(true);
    nextScreen();
    
  }
//send in data to server
  const sendInData = async () =>{
    try {
      let user = await AsyncStorage.getItem('user');  
      let parsed = JSON.parse(user);
      let photo = await AsyncStorage.getItem('userphoto');
  
      const base64 = await FileSystem.readAsStringAsync(photo, { 'encoding': FileSystem.EncodingType.Base64 });
      userphoto = base64 ;  
  
      newmobileNo = parsed.userMobile;
      newsubDomain = parsed.subDomain;
      // console.log(mobileNo);
      // console.log(subDomain);
      // console.log(newmobileNo);
      // console.log(newsubDomain);
      axios.post(`https://${newsubDomain}.vaimssolutions.com/api/AttendanceApi`,{
        mobile:newmobileNo,
        intime:InTime,
        locationin:newtextLocation,
        imagein:userphoto,
    
      }).then((res)=>{
        
        let logId = {
          checkInId : res.data.id,
        }
        storeData(logId);

      }).catch((error)=>{
        alert("Please try again as your internet is slow");
        console.log(error);
      })
    }catch(e){
      console.log(e);
    }
    
  }
  
  // storing users input for future reference
  const storeData = async (value) => {
    try { 
      await AsyncStorage.setItem('logId', JSON.stringify(value))
    } catch (e) {
      // saving error
    }
}
//send out data to server
const getData = async () => {
  try {
    let logId = await AsyncStorage.getItem('logId');  
    let parsed = JSON.parse(logId);
    checkInId = parsed.checkInId;
    // console.log(checkInId);
    let user = await AsyncStorage.getItem('user');  
    let newparsed = JSON.parse(user);
    let photo = await AsyncStorage.getItem('userphoto');
  
    const base64 = await FileSystem.readAsStringAsync(photo, { 'encoding': FileSystem.EncodingType.Base64 });
    userphoto = base64 ;  
  
    newmobileNo = newparsed.userMobile;
    newsubDomain = newparsed.subDomain;
    // console.log(newsubDomain);
    // console.log(userphoto);
    // const params = new URLSearchParams({id:checkInId}).toString();
    // console.log(params);
    axios.put(`https://${newsubDomain}.vaimssolutions.com/api/AttendanceApi?id=${checkInId}`,{
      
      outtime:OutTime,
      locationout:newtextLocation,
      imageout:userphoto,
    }).then((res)=>{
      // console.log(JSON.stringify(res.data))
    }).catch((error)=>{
      console.log(error);
  
    })
  } catch(e) {
      console.log(e);
  }
}
//to get stored user data
const getUserData = async () => {
  try {
    let user = await AsyncStorage.getItem('user');  
    let parsed = JSON.parse(user);  

    newmobileNo = parsed.userMobile;
    newsubDomain = parsed.subDomain;
    console.log(newmobileNo);
    console.log(newsubDomain);
    axios.get(`https://${newsubDomain}.vaimssolutions.com/api/AttendanceApi/checkinstatus?mobile=${newmobileNo}`,{
      
    }).then((res)=>{
      // console.log(res);
      
      if((res.data.intime !== 0) && (res.data.outtime == 0)){

        setTimeCheck(false);
      }else{
        setTimeCheck(true);
      }

    }).catch((error)=>{
      // alert("Please try again as your internet is slow");
      // console.log(error);
      if(error){
        console.log("error in api data data");
      }
  
    })
  }catch(e){
    if(e){
      console.log("error in getting local data");
    }
    console.log(e);
  }
};
//to get local storage data
useEffect(() => {
  getUserData();
}, [])
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {!userLatitude ? <ActivityIndicator size="large"  /> : <View style={styles.container}>
      <MapView style={styles.mapView}
      loadingEnabled={true}
      region={{

        latitude:userLatitude,
        longitude:userLongitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15
      }}>
        {!userLatitude ? <Text></Text> : <MapView.Marker coordinate={{ latitude:userLatitude, longitude:userLongitude }} />}
        
      </MapView>
    </View>  }
      </View>
      
      {!location ? <Text>Wait...........</Text> : <View style={styles.attendanceBoard} >
          <View>
            <Text style={styles.locationTitleText}> Location</Text>
            <Text style={styles.big}>
              {!location
                ? ''
                : ` \n${address?.["name"]},${address?.["district"]},${address?.["subregion"]},${address?.["region"]}
                  \nPincode:${address?.["postalCode"]},Country:${address?.["country"]}`}
            </Text>
          </View>
          
          <View style={styles.buttonWrapper}>
            
            { timeCheck ? <TouchableOpacity onPress={getInTime} style={{
                              // height: 20,
                              backgroundColor: 'green',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10,
                              paddingHorizontal:40,
                              width:"100%",
                              // marginTop: 300,
                            }} >
                            
                            <View>
                              <Text style={styles.btnText}> IN </Text>
                            </View>
                          </TouchableOpacity>
                          : <TouchableOpacity onPress={getOutTime} style={{
                            // height: 20,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            paddingHorizontal:40,
                            width:"100%",
                            margin:10,
                            // marginTop: 300,
                          }} >
                            
                        <View>
                          <Text style={styles.btnText}> OUT </Text>
                        </View>
                        </TouchableOpacity>
                            }
                            
          </View>
      </View>}
      
      
      
    </View>
  );
}



export default LocationScreen;

