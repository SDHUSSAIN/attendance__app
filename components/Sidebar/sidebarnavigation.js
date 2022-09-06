import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text,View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import HomeMain from '../Home';
import Report from '../Report';
import LeaveReport from '../LeaveReport';
import ProfileScreen from '../ProfileScreen';
import HelpScreen from '../HelpScreen';


const HomeStack =  createNativeStackNavigator();
const AttendanceReportStack =  createNativeStackNavigator();
const HelptStack =  createNativeStackNavigator();
const LeaveReportStack =  createNativeStackNavigator();
const ProfileStack =  createNativeStackNavigator(); 
const Drawer = createDrawerNavigator();

const HomeStackScreen = () =>(
  
  <HomeStack.Navigator  >
    <HomeStack.Screen name="HomeMain" options={{ headerShown: false }} component={HomeMain} />
    
  </HomeStack.Navigator>
  
);
const AttendanceReportStackScreen = ({navigation}) =>(
  <AttendanceReportStack.Navigator  screenOptions={{
    headerStyle:{
        backgroundColor:"#555eee",
    },
    headerTintColor:"#ffffff",
    headerTitleStyle:{
        fontWeight:"bold",
    }
    }} >
    <AttendanceReportStack.Screen name="Report" options={{ headerShown: false,  }} component={Report} />
   
  </AttendanceReportStack.Navigator>
);

const LeaveReportStackScreen = ({navigation}) =>(
  <LeaveReportStack.Navigator  screenOptions={{
    headerStyle:{
        backgroundColor:"#555eee",
    },
    headerTintColor:"#ffffff",
    headerTitleStyle:{
        fontWeight:"bold",
    }
    }} >
    <LeaveReportStack.Screen name="LeaveReport" options={{ headerShown: false }} component={LeaveReport} />
  </LeaveReportStack.Navigator>
);
const HelpStackScreen = ({navigation}) =>(
  <HelptStack.Navigator  screenOptions={{
    headerStyle:{
        backgroundColor:"#555eee",
    },
    headerTintColor:"#ffffff",
    headerTitleStyle:{
        fontWeight:"bold",
    }
    }} >
    <HelptStack.Screen name="HelpScreen" options={{ headerShown: false }} component={HelpScreen} />
  </HelptStack.Navigator>
);
const ProfileStackScreen = ({navigation}) =>(
  <ProfileStack.Navigator   >
    <ProfileStack.Screen name="ProfileScreen" options={{ headerShown: false }} component={ProfileScreen}></ProfileStack.Screen>
        {/* // <ProfileStack.Screen name="Profile" options={{ headerShown: false }} component={Profile} /> */}
  </ProfileStack.Navigator>
);


const CustomeHeader=props=>{
   return(
      <DrawerContentScrollView {...props} >
         <View style={{flexDirection:"row",paddingLeft:20,alignItems:"center",paddingTop:30,paddingBottom:10,backgroundColor:"#00000010"}}>
            <Ionicons name="finger-print" size={70} color="#555EEE"/>
            <Text style={{fontSize:30,fontWeight:"bold",color:"#555EEE"}} > Acksense</Text>
         </View>
         <View style={{flexDirection:"row",paddingLeft:80,alignItems:"center",paddingBottom:10,backgroundColor:"#00000010"}} >
            <Text style={{fontSize:12,fontWeight:"bold",color:"#00000050"}} >V AIMS SOLUTIONS PVT LTD</Text>
            </View>
         
         <DrawerItemList {...props} />
      </DrawerContentScrollView>
   );

}



const sidebarNavigation = () => {
    return(
            <Drawer.Navigator initialRouteName="Home " drawerContent={(props)=> <CustomeHeader {...props} />}>
               
                <Drawer.Screen
                name="Home"
                options={{
           
                           drawerIcon: ({focused, size}) => (
                              <Ionicons
                                 name="md-home"
                                 size={size}
                                 color={focused ? '#555EEE' : '#555EEE60'}
                              />
                           ),
                        }}
                
                component={HomeStackScreen}
                />
                <Drawer.Screen
                name="Attendance Report"
                options={{
           
                           drawerIcon: ({focused, size}) => (
                              <Ionicons
                                 name="md-today"
                                 size={size}
                                 color={focused ? '#555EEE' : '#555EEE60'}
                              />
                           ),
                        }}
                
                component={AttendanceReportStackScreen}
                />
                <Drawer.Screen
                name="Leave Report"
                options={{
           
                           drawerIcon: ({focused, size}) => (
                              <Ionicons
                                 name="md-document"
                                 size={size}
                                 color={focused ? '#555EEE' : '#555EEE60'}
                              />
                           ),
                        }}
                
                component={LeaveReportStackScreen}
                />
                <Drawer.Screen
                name="Request Help"
                options={{
                           
                           drawerIcon: ({focused, size}) => (
                              <Ionicons
                                 name="help-circle"
                                 size={size}
                                 color={focused ? '#555EEE' : '#555EEE60'}
                              />
                           ),
                        }}
                
                component={HelpStackScreen}
                /> 
                
                
                <Drawer.Screen
                name="Profile"
                options={{
                              
                              drawerIcon: ({focused, size}) => (
                                 <Ionicons
                                    name="md-person"
                                    size={size}
                                    color={focused ? '#555EEE' : '#555EEE60'}
                                 />
                              ),
                           }}
                
                component={ProfileStackScreen}
                />
                
                
            
            </Drawer.Navigator>
    );
}

export default sidebarNavigation;