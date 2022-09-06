import React, { useEffect, useState } from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View,TouchableOpacity,Image } from 'react-native';
import styles from '../InitialScreen/style'


const InitialScreen = ({navigation}) => {

    // const [userMobileNo,setUserMobileNO] = useState("");

    
    const toSignup = () => navigation.navigate("Signup");
    // const toMyTabs = () => navigation.navigate("DrawerNavigation");

    
    return(
        <View style = {styles.container}>
            <View style = {styles.imageContainer}>
                <Image source={require('../../assets/login.png')} style ={styles.image} />
            </View>
            <View style = {styles.buttonWrapper}>
                <TouchableOpacity style={styles.loginButton} onPress={toSignup}>
                    <Text style={{color:"#ffffff",fontSize:30,fontWeight:"bold"}}>Register</Text>
                </TouchableOpacity >
                
            </View>
            
        </View>

    );
};

export default InitialScreen;