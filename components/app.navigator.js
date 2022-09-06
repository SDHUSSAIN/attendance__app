import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialScreen from './InitialScreen';
import Signup from './SignupScreen';
import VerificationScreen from './VerificationScreen';
import AdminReports from './AdminReports/index';
import dailyAttendanceReport from './AdminReports/ReportSummary/dailyAttendanceReport';
import monthlyAttendanceReport from './AdminReports/ReportSummary/monthlyAttendanceReport';
import employeeSummary from './AdminReports/ReportSummary/employeeSummary';
import leaveStatusReport from './AdminReports/ReportSummary/leaveStatusReport';
import Home from './Home';
import CameraScreen from './Camera';
import LocationScreen from './Location';
import MyTabs from './app.navigator.tab';
import DrawerNavigation from './Sidebar/sidebarnavigation';


const Stack =  createNativeStackNavigator(); 



const AppNavigator = ({navigation})=>{

    const [isLoading,setIsLoading] = useState(true);
    var mobileNo;
    
    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          console.log(mobileNo);
          if(mobileNo!=null){
            setIsLoading (false);
          } 
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return( 
        <NavigationContainer>

            {isLoading ? 
            <Stack.Navigator  >

                <Stack.Screen name="Splash" options={{ headerShown: false, title:"Welcome" }} component={InitialScreen} />
                <Stack.Screen name="Signup" options={{ headerShown: false, title:"Register" }} component={Signup} />
                <Stack.Screen name="Verify" options={{ headerShown: false, title:"Verification" }} component={VerificationScreen} />
                <Stack.Screen name="DrawerNavigation" options={{ headerShown: false,  }} component={DrawerNavigation} />
                <Stack.Screen name="Camera" options={{ headerShown: false, title:"Take Selfie" }} component={CameraScreen} />
                <Stack.Screen name="Location" options={{ headerShown: false, title:"Get Location" }} component={LocationScreen} />
                <Stack.Screen name="adminreports" options={{ headerShown: false, title:"View Reports" }} component={AdminReports} />
                <Stack.Screen name="dailyAttendanceReport" options={{ headerShown: false, title:"Daily Attendance Report" }} component={dailyAttendanceReport} />
                <Stack.Screen name="monthlyAttendanceReport" options={{ headerShown: false, title:"Monthly Attendance Report" }} component={monthlyAttendanceReport} />
                <Stack.Screen name="employeeSummary" options={{ headerShown: false, title:"Employee Summary" }} component={employeeSummary} />
                <Stack.Screen name="leaveStatusReport" options={{ headerShown: false, title:"Leave Status Report" }} component={leaveStatusReport} />
            </Stack.Navigator> : 
            <Stack.Navigator  >

                
                <Stack.Screen name="DrawerNavigation" options={{ headerShown: false,  }} component={DrawerNavigation} />
                <Stack.Screen name="Camera" options={{ headerShown: false, title:"Take Selfie" }} component={CameraScreen} />
                <Stack.Screen name="Location" options={{ headerShown: false, title:"Get Location" }} component={LocationScreen} />
                <Stack.Screen name="adminreports" options={{ headerShown: false, title:"View Reports" }} component={AdminReports} />
                <Stack.Screen name="dailyAttendanceReport" options={{ headerShown: false, title:"Daily Attendance Report" }} component={dailyAttendanceReport} />
                <Stack.Screen name="monthlyAttendanceReport" options={{ headerShown: false, title:"Monthly Attendance Report" }} component={monthlyAttendanceReport} />
                <Stack.Screen name="employeeSummary" options={{ headerShown: false, title:"Employee Summary" }} component={employeeSummary} />
                <Stack.Screen name="leaveStatusReport" options={{ headerShown: false, title:"Leave Status Report" }} component={leaveStatusReport} />
            </Stack.Navigator> }
              
        </NavigationContainer>
    );
}

export default AppNavigator;