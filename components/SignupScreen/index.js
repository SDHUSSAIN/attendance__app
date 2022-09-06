import React, {useState} from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View ,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ProgressBar, Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconImg from 'react-native-vector-icons/Entypo';
// import Splash from "../../assets/icon.svg";
import styles from './style';


const axiosInstance = axios.create({
    baseURL : "https://testacksence.vaimssolutions.com"
});



const Signup =({navigation})=>{ 
    
    const [companyid, setcompanyid] = useState();
    const [mobile, setmobile] = useState();
    // const [isLoading, setIsLoading] = useState(false); 

    // get user employer id

    const onChangeEmpIDHandler = (employerID) => {
        // console.log(employerID);
        setcompanyid(employerID);
    };

    
    //get user phone no
    
    const onChangePhoneNoHandler = (phonenumber) => {
        // console.log(phonenumber);
        setmobile(phonenumber);
    };

   
    // storing users input for future reference
    const storeData = async (value) => {
        try {
           
          await AsyncStorage.setItem('user', JSON.stringify(value))
        } catch (e) {
          // saving error
        }
    }
    
   //on successfull submission send user to next screen

    const verifyScreen = () => navigation.navigate("Verify");

    const initialScreen = () => navigation.navigate("Splash");


    // on submit post the data to database and reset fields to blank
    
    const onSubmitFormHandler = async (event) => {

       if((companyid=="") || (mobile=="")){
            alert("Please provide all madatory information");
       }
       if((companyid!="") && (mobile!="")){
        verifyScreen();
        
        axiosInstance.post('/api/CompanyApi',{
            companyid:companyid,
            mobile:mobile,
        }).then((res) =>{
                
                if (res.status === 200) {
                    alert("OTP sent successfully");
                    console.log(res.data.id);
                    console.log(res.data.subdomain);
                    let userLoginData = {
                        subDomain:res.data.subdomain,

                        userMobile:mobile,
                        AdminResponse:res.data.isadmin,

                    }
                    storeData(userLoginData);
                    
                } else {
                    
                    alert("You are not registered with us pls contact your employer");
                    initialScreen();
                    
                }
        }).catch ((error) =>{
                console.log(error);
                alert("Employer ID or Mobile provided by you is incorrect please try again");
                initialScreen();
            //   setIsLoading(false);
        });
        setcompanyid('');
        setmobile('');
        };
        
    };
      
    
    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.headerWrapper}>
                <ScrollView keyboardDismissMode="on-drag">
                
                <View style={{width:20}}/>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                   
                    <IconImg  name ="tablet-mobile-combo" size={100} style={styles.iconImg} />
                </View>
            

            <View style={styles.content} >
                <View>
                    <Text style={styles.title} >Personal Information &gt;</Text>
                </View>
                <View>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Please enter your Employer ID"
                        placeholderTextColor="#ababab"
                        numeric
                        keyboardType={'numeric'}
                        required={true}
                        value={companyid}
                        // editable={!isLoading}
                        onChangeText={onChangeEmpIDHandler}
                    ></TextInput>
                </View>
                <View>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Your mobile no"
                        placeholderTextColor="#ababab"
                        numeric
                        keyboardType={'numeric'}
                        required={true}
                        minLength={12}
                        value={mobile}
                        // editable={!isLoading}
                        onChangeText={onChangePhoneNoHandler}
                    ></TextInput>
                </View>
                <View>
                    <Text
                        style={styles.description}
                        
                    >We will send a verification code to your phone number </Text>
                </View>
                <View style={styles.buttonWrapper} >
                    <TouchableOpacity style={styles.button} onPress={onSubmitFormHandler} >
                        <Icon name="arrow-right" size={30} style={styles.iconButton} />
                    </TouchableOpacity>
                </View>

            </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    );

};

export default Signup;