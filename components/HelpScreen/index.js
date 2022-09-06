import React,{useState} from 'react';

import { Text,View,Linking,Image, TouchableOpacity,Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


export default function HelpScreen (){

    const OpenWhatsapp = ()=>{
        let msg = "Hello I need Help";
        let mobile = 8860171890;
        let url = "whatsapp://send?text=" + msg + "&phone=91" + mobile;
        Linking.openURL(url).then(data=>{
            // console.log(data);
        }).catch(()=>{
            alert("Make sure you have whatsapp installed on your app");
        })

    }

    const makeCall = ()=>{
        let phone = 8860171890;
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
          }
          else  {
            phoneNumber = `tel:${phone}`;
          }
          Linking.canOpenURL(phoneNumber)
          .then(supported => {
            if (!supported) {
              Alert.alert('Phone number is not available');
            } else {
              return Linking.openURL(phoneNumber);
            }
          })
          .catch(err => console.log(err));
    }
    return(
        <>
        <View style={{flex:1,alignItems:'center' ,marginTop:40,padding:20,}}>
           
            <Image source={require("../../assets/customerSupport.jpg")} style={{width:"100%",height:"50%",borderRadius:200}} />
            <Text style={{fontSize:22,fontWeight:"bold",marginTop:20,}} >How can we help you?</Text>
            <Text style={{textAlign:'center',marginTop:5,marginBottom:5,color:"#00000090"}} >Its looks like that you are experiencing problems with our application.We are here to help you so please get in touch with us</Text>
            <View style={{display:'flex',flexDirection:'row',marginTop:10,justifyContent:'space-evenly'}}>
                <TouchableOpacity onPress={OpenWhatsapp} style={{alignItems:'center',margin:30,backgroundColor:"#00000015",overflow:"hidden",padding:20,borderRadius:20,width:120,height:120,}} ><Icon name="logo-whatsapp" size={50} color={"green"} /><Text>Chat with us</Text></TouchableOpacity>
                <TouchableOpacity onPress={makeCall} style={{alignItems:'center',margin:30,backgroundColor:"#00000015",padding:20,borderRadius:20,width:120,height:120}} ><Icon name="call-outline" size={50} color={"blue"} /><Text>Call us</Text></TouchableOpacity>
                

            </View>
            
        </View>
        </>
    );
}
