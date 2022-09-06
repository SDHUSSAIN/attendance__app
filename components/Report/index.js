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
          axios.get(`https://${subDomain}.vaimssolutions.com/api/AttendanceApi?mobile=${mobileNo}`,{}).then((res)=>{

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
            <View style={styles.reprotTitle}>
              <Text style={{fontSize:20,color:"#555eee"}}>Monthly Report</Text>
            </View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Day</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Punch In</DataTable.Title>
                <DataTable.Title>Punch Out</DataTable.Title>
              
              </DataTable.Header>
              {
                  userData.map((data,index)=>{
                      return(
                          <DataTable.Row key={index}>
                              <DataTable.Cell>{data.days}</DataTable.Cell>
                              <DataTable.Cell>{data.status}</DataTable.Cell>
                              <DataTable.Cell>{data.intime}</DataTable.Cell>
                              <DataTable.Cell>{data.outtime}</DataTable.Cell>  
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
    paddingHorizontal: 30,
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