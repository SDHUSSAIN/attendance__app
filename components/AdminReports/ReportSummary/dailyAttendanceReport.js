import React, { useState,useEffect } from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconCalender from 'react-native-vector-icons/EvilIcons';
import { Button, DataTable } from 'react-native-paper';





export default function DailyAttendanceReport() {

    const [userData,setUserData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [reportTitleDate,setReportTitleDate] = useState(new Date());


    const onChange = (event, selectedDate) => {
      const reportDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(reportDate);
      
    };
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('date');
    };

    var mobileNo;
    var subDomain;
    var reportingDate;
    var currentDate = new Date();
    



    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          
          // console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/AdminReportApi?mobile=${mobileNo}`,{}).then((res)=>{

            setUserData(res.data);
            // console.log(res.data);
            // setUserData(res.data);
            
          })
        } catch(e) {
            console.log(e);
        }
    }

    const getDatewiseData = async()=>{
      if(date<=currentDate){
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
  
          reportingDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
          setReportTitleDate(date);
          // console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/DailyReportApi?mobile=${mobileNo}&date=${reportingDate}`,{}).then((res)=>{
  
            setUserData(res.data);
            // console.log(res.data);
            // setUserData(res.data);
            
          })
        } catch(e) {
            console.log(e);
        }
  
      }else{
        alert("Report date can not be greater than current date");
      }
      
    }
    
    useEffect(() => {
        getData(); 
    }, []);

    

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ScrollView keyboardDismissMode="on-drag">
      
      <View style={styles.dateContainer}>
        <Text style={{fontSize:20,paddingLeft:30,paddingRight:30,color:"#00000099",paddingTop:10,paddingBottom:10,}}>Select Date</Text>
      <Text style={{backgroundColor:"#c5e3f6",padding:10,borderRadius:25,}}>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>
        <TouchableOpacity onPress={showDatepicker} style={{marginTop:10,}}>
          <IconCalender name="calendar" size={50} style={{color:"#9c1de7",marginBottom:15,}} />
        </TouchableOpacity>
        {show && (
                                    <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChange}
                                    />
                                    
                                )}
      </View>
      <View style={{marginBottom:30}}><Button onPress={getDatewiseData} style={{borderWidth:1,borderColor:"#00000099",}}>Click To View Report</Button></View>
      <View style={{display:"flex",alignItems:'center',justifyContent:"center",borderWidth:1,borderColor:"#00000099",backgroundColor:"#c5e3f6",paddingTop:15,paddingBottom:15}}>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>Daily Attendance Report</Text>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>({`${reportTitleDate.getDate()}/${reportTitleDate.getMonth()+1}/${reportTitleDate.getFullYear()}`})</Text>
      </View>
      
      <DataTable style={{borderWidth:1,borderColor:"#00000099"}} >
        <DataTable.Header style={{backgroundColor:"#c5e3f6",borderBottomWidth:1,borderColor:"#00000099"}}>
          {/* <DataTable.Title>S.no</DataTable.Title> */}
          <DataTable.Title style={{minWidth:"20%"}}><Text style={{color:"#00000099"}}>Name</Text></DataTable.Title>
          <DataTable.Title style={{minWidth:"10%"}}><Text style={{color:"#00000099"}}>Status</Text></DataTable.Title>
          <DataTable.Title style={{minWidth:"10%"}}><Text style={{color:"#00000099"}}>IN</Text></DataTable.Title>
          <DataTable.Title style={{minWidth:"10%"}}><Text style={{color:"#00000099"}}>OUT</Text></DataTable.Title>
          <DataTable.Title style={{minWidth:"30%"}}><Text style={{color:"#00000099"}}>Location in</Text></DataTable.Title>
         
         
        </DataTable.Header>
        {
            userData.map((data,index)=>{
                return(
                    <DataTable.Row key={index}>
                        {/* <DataTable.Cell><Text style={{fontSize:10}}>{data.sno}</Text></DataTable.Cell> */}
                        <DataTable.Cell style={{minWidth:"20%"}}><Text style={{fontSize:10}} numberOfLines={3}>{data.name}</Text></DataTable.Cell>
                        <DataTable.Cell style={{minWidth:"10%"}}><Text style={{fontSize:10}} numberOfLines={3}>{data.status}</Text></DataTable.Cell>
                        <DataTable.Cell style={{minWidth:"10%"}}><Text style={{fontSize:10}}numberOfLines={3}>{data.intime}</Text></DataTable.Cell>
                        <DataTable.Cell style={{minWidth:"10%"}}><Text style={{fontSize:10}}numberOfLines={3}>{data.outtime}</Text></DataTable.Cell>
                        <DataTable.Cell style={{minWidth:"30%"}}><Text style={{fontSize:10}}numberOfLines={3}>{data.locationin}</Text></DataTable.Cell>
                         
                    </DataTable.Row>
                )

            })
        }
      </DataTable>
      
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor:"#ffffff",
    borderRadius:10,
    marginBottom:20,

    
  },
  dateContainer:{
    display:'flex',
    alignItems:"center",
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:40,
    marginBottom:30,
    // paddingRight:30,
    // paddingLeft:30,
    borderWidth:1,


},
  reprotTitle:{
    width:"100%",
    backgroundColor:"#ffffff",
    height:60,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
  },
  
});