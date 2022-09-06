import React,{useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from "axios";
import CameraScreen from './Camera';
import LocationScreen from './Location';
import Report from './Report';
import LeaveReport from './LeaveReport';
import Profile from './ProfileScreen';
import Demo from './DemoScreen';



const Tab = createBottomTabNavigator();

const MyTabs = ({navigation}) => {

  const [ userProfileData,setUserProfileData] = useState([]);
  const [ isloading,setIsLoading] = useState(true);
    var userMobile;
    const getUserData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
          return parsed ; 
        }catch(e) {
            console.log(e);
        }
 
    }

    const getProfileData = ()=>{

      console.log("i am on mytabs");

        getUserData().then((res)=>{
            let subDomain = res.subDomain;
            userMobile = res.userMobile;

            axios.get(`https://${subDomain}.vaimssolutions.com/api/EmployeeProfileApi?mobile=${userMobile}`,{
            }).then((res) =>{
              setIsLoading(false);
              setUserProfileData(res.data);
                console.log(res.data);
            }).catch ((error) =>{
                console.log(error);
                alert("We are busy please try again later");
            });

        }).catch((err)=>{
            console.log(err);

        });
        
    };
     useEffect(() => {
      getProfileData();
     }, [])
    

    
    return (
      <Tab.Navigator >
        
        <Tab.Screen name="Report" component={Report} />
        <Tab.Screen name="Home" component={Home}  />
        
        {isloading ? <Tab.Screen name="Demo" component={Demo} Demo /> : <Tab.Screen name="Profile" >{()=> <Profile userData = {userProfileData} />}</Tab.Screen> }
        
        <Tab.Screen name="LeaveReport" component={LeaveReport} />
      </Tab.Navigator>
    );
}

export default MyTabs;