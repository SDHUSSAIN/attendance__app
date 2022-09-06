import React, {useState,useEffect,useRef}  from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import axios  from "axios";
import DropDownPicker from 'react-native-dropdown-picker';

import {View,Text,StatusBar,TextInput,TouchableOpacity,SafeAreaView, ScrollView,Platform,Button, Image} from 'react-native';
import styles from './style';

import HandIcon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import IconCalender from 'react-native-vector-icons/EvilIcons';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
});

const getPushToken = () => {
    if (!Constants.isDevice) {
        return alert('Must use physical device for Push Notifications');
    }

    try {
        return Notifications.getPermissionsAsync()
            .then((statusResult) => {
                return statusResult.status !== 'granted'
                    ? Notifications.requestPermissionsAsync()
                    : statusResult;
            })
            .then((statusResult) => {
                if (statusResult.status !== 'granted') {
                    alert('Failed to get push token for push notification!');
                }
                return Notifications.getExpoPushTokenAsync();
            })
            .then((tokenData) => tokenData.data);
    } catch (error) {
        return Promise.reject("Couldn't check notifications permissions");
    }
};





const Home = ({navigation}) =>{

    const [fromdate, setfromDate] = useState(new Date());
    const [todate, settoDate] = useState(new Date());
    const [frommode, setfromMode] = useState('date');
    const [tomode, settoMode] = useState('date');
    const [fromshow, setfromShow] = useState(false);
    const [toshow, settoShow] = useState(false);
    const [userData,setUserData] = useState([]);
    const [leaveType,setLeaveType] = useState("");
    const [message,setMessage] = useState("");
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState("");
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isAdmin,setIsAdmin] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Half Day', value: 'Half'},
        {label: 'Full Day', value: 'Full'},
        {label:'More', value:'other'},
    ]);

    


    const Attendance = () =>navigation.navigate("Camera");
    const AdminScreen = () =>navigation.navigate("adminreports");

    const onChange = (event, selectedDate) => {
        const currentfromDate = selectedDate || fromdate;
        setfromShow(Platform.OS === 'ios');
        setfromDate(currentfromDate);
    };
    const onChangeto = (event, selectedDate) => {
        const currenttoDate = selectedDate || todate;
        settoShow(Platform.OS === 'ios');
        settoDate(currenttoDate);
    };
    
    const showMode = (currentMode) => {
        setfromShow(true);
        setfromMode(currentMode);
    };
    const showModeto = (currentMode) => {
        settoShow(true);
        settoMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const showDatepickerto = () => {
        showModeto('date');
    };

    var mobileNo;
    var subDomain;

    const getDataPost = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          
          console.log(mobileNo);
          axios.post(`https://${subDomain}.vaimssolutions.com/api/LeaveApi`,{
        
            mobile:mobileNo,
            datefrom:fromdate,
            dateto:todate,
            leavetype:leaveType,
            remarks:message,

            }).then((res) =>{
                if (res.status === 200) {
                 alert("We have received your request it will be processed in next 24 Hours");
                    
                } 
            }).catch ((error) =>{
            console.log(error);
            alert("We are busy please try again later")})
        
        }catch(e) {
            console.log(e);
        }
        
    }

    const onRequestSubmit = () =>{
        
        if(message==""){
            alert("Please provide reason for leave ");
        }else if(leaveType==""){
            alert("Please select leave type");
            
            
        }else if (fromdate>todate){
            alert("From date can not be greater than to date");

        }else{
            
            getDataPost();
            setLeaveType("");
            setMessage(""); 
            
        }
        
    }

    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          let isAdminResponse = parsed.AdminResponse;
          console.log(isAdminResponse);
          if(isAdminResponse=="Yes"){
              setIsAdmin(true);

          }
          console.log(mobileNo);
          console.log(subDomain);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/AttendanceSummaryApi?mobile=${mobileNo}`,{}).then((res)=>{

            setUserData(res.data);
            // setUserData(res.data);
           
          })
          getPushToken().then((pushToken) => {
            setExpoPushToken(pushToken);
            if (pushToken) {
                // console.log(pushToken);
                axios.post(`https://${subDomain}.vaimssolutions.com/api/NotificationApi`,{
        
                token:pushToken,
                mobile:mobileNo,
                

                }).then((res) =>{
                    if (res.status === 200) {
                    // alert("Thanks for subscription");    
                    } 
                }).catch ((error) =>{
                console.log(error);
                alert("Ooo, its taking too much time")})
        
            }
            });

            notificationListener.current =
            Notifications.addNotificationReceivedListener(setNotification);

             responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                setNotification(response.notification);
            }
        );
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };

        
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        
    }, []);
    useEffect(() => {
        getData();
    }, [])
    
    


    return(
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView keyboardDismissMode="on-drag">
                    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
                    {/* <View style={styles.backButton}> 
                        
                        <Icon  name ="chevron-left" size={50} style={styles.icon} />
                        <Text style= {styles.titleSummary,{fontSize:25,color:"#fff",}} >Home</Text> 
                    </View> */}

                    <View style={styles.attendanceContainer}>
                        <Text style={{color:"#000000",marginBottom:15,}}>Let's get to work</Text>
                        <TouchableOpacity style={styles.attendacneButton} onPress={Attendance}>
                            <HandIcon  name ="hand-right" size={30} style={{color:"orange"}} />
                            <Text style= {styles.buttonText}>Mark Attendance</Text>
                        </TouchableOpacity>
                        <Text style={{color:"#000000",marginBottom:15,textAlign:"center",}}>Here you will be asked for Camera and Location permission so please allow </Text>
                    </View>
                    {
                        userData.map((data,index)=>{
                                return(
                                    <View style={styles.summaryContainer} key={index}>
                        <Text style={styles.titleSummary} >Attendance This Month</Text>
                        <View style={styles.summaryCards} >
                            <View  style={styles.sumamryCard1}>
                                <Text style= {styles.valueText}>{data.present}</Text>
                                <Text style={styles.valueTitleText} >Present</Text>
                            </View>
                            <View style={styles.sumamryCard} styles={styles.sumamryCard2} >
                                <Text style= {styles.valueText} >{data.latedays}</Text>
                                <Text style={styles.valueTitleText} >Late</Text>
                            </View>
                            <View style={styles.sumamryCard} styles={styles.sumamryCard3} >
                                <Text style= {styles.valueText} >{data.leave}</Text>
                                <Text style={styles.valueTitleText} >Leave</Text>
                            </View>
                            <View style={styles.sumamryCard} styles={styles.sumamryCard4} >
                                <Text style= {styles.valueText} >{data.absent}</Text>
                                <Text style={styles.valueTitleText} >Absent</Text>
                            </View>
                        </View>
                        {/* <View style={styles.sumamryCard} style={styles.sumamryCard5} >
                            <Text style= {styles.valueTextW} >{data.hoursworked} Hours</Text>
                            <Text style={styles.valueTitleTextW} >Total Time</Text>

                        </View> */}

                    </View>
                                )

                        })
                    }
                    {isAdmin ? <View style={{marginTop:20,marginBottom:20,}}>
                        <Image source={require("../../assets/reports.png")} style={{width:"100%",height:150,resizeMode:'contain'}}/>
                        <Text style={{fontSize:25,fontWeight:'bold',textAlign:"center",color:"#00000095"}}>Admin Reports</Text>
                        <Text style={{textAlign:'center',color:"#00000095"}}>These reports are prepared to give overview of daily and monthly repots on the go.You can access these reports from anywhere anytime which helps to take control whenever you want</Text>
                        <TouchableOpacity onPress={AdminScreen} style={{backgroundColor:"#00000010",padding:5,borderRadius:30,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}><Text style={{textAlign:'center',fontSize:20, color:'#482ff7',}}>Click To View</Text><HandIcon name="arrow-forward-circle-outline" color="#482ff7" size={40}/></TouchableOpacity>
                    </View> : <Text></Text> }
                    
                    <View style={styles.leaveContainer}>
                        <Text style={{color:"#000000",fontSize:20,fontWeight:"bold",marginBottom:15,}}>Request Leave</Text>
                        
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={(value)=>setLeaveType(value)}
                        />
                        <View style={styles.summaryCards} >
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <TouchableOpacity onPress={showDatepicker}>
                                    <IconCalender name="calendar" size={50} style={{color:"#000000",marginBottom:15,}} />
                                </TouchableOpacity>
                                <Text style={{color:"#000000",marginBottom:5}}>From</Text>
                                <Text style={{color:"#000000",fontSize:18,borderWidth:1,paddingVertical:5,paddingHorizontal:15,borderColor:"#000000"}}>{`${fromdate.getUTCDate()}/${fromdate.getUTCMonth()+1}/${fromdate.getUTCFullYear()}`}</Text>
                            </View>
                            {fromshow && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fromdate}
                                    mode={frommode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChange}
                                    />
                                    
                                )}
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <TouchableOpacity onPress={showDatepickerto} >
                                    <IconCalender name="calendar" size={50} style={{color:"#000000",marginBottom:15,}} />
                                </TouchableOpacity>
                                <Text style={{color:"#000000",marginBottom:5}}>To</Text>
                                <Text style={{color:"#000000",fontSize:18,borderWidth:1,paddingVertical:5,paddingHorizontal:15,borderColor:"#000000"}} >{`${todate.getUTCDate()}/${todate.getUTCMonth()+1}/${todate.getUTCFullYear()}`}</Text>
                            </View>
                            
                            {toshow && (
                                    <DateTimePicker
                                    testID="dateTimePickerto"
                                    value={todate}
                                    mode={tomode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChangeto}
                                    />
                                    
                                )}

                        </View>
                        <View>
                            <TextInput
                                style={{ height: 140, fontSize:20,marginBottom:15, borderColor: '#000000', borderWidth: 1,borderRadius:10,paddingHorizontal:15,color:"#555eee", }}
                                multiline={true}
                                numberOfLines={6}
                                placeholderTextColor="#000000"
                                placeholder="Write your message here..."
                                onChangeText={(text) => setMessage(text)}
                                // value={value}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{height:50,backgroundColor:"#ffffff",borderRadius:20,alignItems:"center",justifyContent:"center",}}
                                onPress={onRequestSubmit}
                            ><Text style={{fontSize:25,color:"#555eee",}}>Send</Text></TouchableOpacity>
                        </View>
                    </View>
                   
                    
                    
                </ScrollView>
            </SafeAreaView>
            
        </View>
    );
}


export default Home;