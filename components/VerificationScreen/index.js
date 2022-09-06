import React, {useRef,useState,useEffect} from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView,TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';





    

const VerificationScreen=({navigation})=> {


    const [isLoading,setIsLoading] = useState(false);
    var mobileNo="+91xxxxxxxxxx";
    var subDomain = "";
    const [ userOTP, setUserOTP] = useState("");
    const verify = () => navigation.navigate("DrawerNavigation");

    const onChangePhoneNoHandler = (otp) => {
        // console.log(otp);
        setUserOTP(otp);
    };

    const getData = async () => {
        setIsLoading(true);
        
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          console.log(mobileNo);
          console.log(subDomain);
          if(userOTP == ""){
            alert("OTP is required");
            }else{
                let URL = `https://${subDomain}.vaimssolutions.com/api/CompanyApi/Verifyotp` ;
                // console.log(URL);
                // console.log(userOTP);
                axios({
                    method: 'post',
                    url: `https://${subDomain}.vaimssolutions.com/api/CompanyApi/Verifyotp`,
                    data: {
                        mobile:mobileNo,
                        otp:userOTP,
                    }
                }).
                then((res)=>{
                    if(res.status==200){
                        // console.log(userOTP);
                        // console.log(res.status);
                        setUserOTP("");
                        
                        verify();
                        
                    }else {
                        alert("OTP is not correct pls provide valid OTP");
                    }
                    // console.log(res.data);
                    }).catch((error)=>{
                        console.log(error);
                    })
            }  
        } catch(e) {
            console.log(e);
        }
    }

    //get users mobile no
    
    
    

    //loading getdata function to data stored in async storage

    


    

    
    return (
        <View style={styles.container} >
            <View style={styles.iconContainer} >
                
                <Icon name="email-newsletter" style= {styles.icon} size={100} />
               

            </View>
            <View style={styles.infoContainer}>
                <View >
                    <Text style={styles.titleText}>We have sent an OTP on your </Text>

                    <Text style={styles.subtitleText} >registered mobile number </Text>
                </View>
            
                <View style={styles.inputBoxWrapper} > 
                    <TextInput 
                        
                        numeric
                        keyboardType={'numeric'}
                        style={styles.inputBox}
                        maxLength={6}
                        minLength={6}
                        onChangeText={onChangePhoneNoHandler}
                    />
                </View>    
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={getData}>
                           {isLoading ?  <Text style={styles.buttonText}>...Loading</Text> : <Text style={styles.buttonText}>Verify</Text> }
                    </TouchableOpacity>
                    

                </View>
            </View>
                
        </View>
    )
    
}

export default VerificationScreen;