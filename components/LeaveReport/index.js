import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView, StyleSheet,ScrollView} from 'react-native';
import axios  from "axios";

import { DataTable } from 'react-native-paper';




export default function Report() {

    const [userData,setUserData] = useState([]);

    var mobileNo;

    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/LeaveApi?mobile=${mobileNo}`,{}).then((res)=>{

            setUserData(res.data);
            // setUserData(res.data);
            // console.log(res.data);
          })
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
      getData();
      
    }, []);

    

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ScrollView keyboardDismissMode="on-drag">
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>From</DataTable.Title>
          <DataTable.Title>To</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
         
        </DataTable.Header>
        {
            userData.map((data,index)=>{
                return(
                    <DataTable.Row key={index}>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.created_date}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.leavetype}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.datefrom}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.dateto}</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={{fontSize:10}}>{data.approvalstatus}</Text></DataTable.Cell>  
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

