import React, { useState,useEffect } from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView, StyleSheet,ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';




export default function Report() {

    const [userData,setUserData] = useState([]);

    var mobileNo;
    var subDomain;

    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          // console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/AdminReportApi?mobile=${mobileNo}`,{}).then((res)=>{

            setUserData(res.data);
            // setUserData(res.data);
            
          })
        } catch(e) {
            console.log(e);
        }
    }

    // var handler = 0 ;
    // const functionHandler =()=>{
    //   if(handler==0){
    //     setTimeout(() => {
    //       getData();
    //       handler = 1;
    //       }, 3000);
    //   }
    // }
    // functionHandler();
    
    useEffect(() => {
        getData(); 
    }, []);

    

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ScrollView keyboardDismissMode="on-drag">
      <DataTable>
        <DataTable.Header>
          {/* <DataTable.Title>S.no</DataTable.Title> */}
          <DataTable.Title>Name</DataTable.Title>
          
          <DataTable.Title>Status</DataTable.Title>
          
          <DataTable.Title>In Time</DataTable.Title>
          <DataTable.Title>Out Time</DataTable.Title>
          <DataTable.Title>Mobile No</DataTable.Title>
         
        </DataTable.Header>
        {
            userData.map((data,index)=>{
                return(
                    <DataTable.Row key={index}>
                        {/* <DataTable.Cell><Text style={{fontSize:10}}>{data.sno}</Text></DataTable.Cell> */}
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.name}</Text></DataTable.Cell>
                        
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.status}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.intime}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.outtime}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.mobile}</Text></DataTable.Cell>    
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