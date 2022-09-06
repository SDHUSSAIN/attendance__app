import React, { useState,useEffect } from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView, StyleSheet,ScrollView,} from 'react-native';

import { Colors, DataTable, IconButton } from 'react-native-paper';
import ModalReport from '../../modalCancel';
import ModalApproveReport from '../../modalApprove';





export default function LeaveStatusReport({props}) {

    const [userData,setUserData] = useState([]);
    const [modalCancelVisible,setModalCancelVisible] = useState(false);
    const [modalApproveVisible,setModalApproveVisible] = useState(false);
    const [leaveStatus,setLeaveStatus] = useState("");
    const [leaveStatusId,setLeaveStatusId] = useState();

    const modalReject = (id)=>{
        
       setModalCancelVisible(true);
       setLeaveStatus("Not Approved");
       setLeaveStatusId(id);
        
    }
    const modalApprove = (id)=>{
        
        setModalApproveVisible(true);
        setLeaveStatus("Approved");
        setLeaveStatusId(id);
        
    }

    const postLeaveStatus=async()=>{
        try {
            let user = await AsyncStorage.getItem('user');  
            let parsed = JSON.parse(user);  
    
            mobileNo = parsed.userMobile;
            subDomain = parsed.subDomain;
            
            // console.log(mobileNo);
            axios.post(`https://${subDomain}.vaimssolutions.com/api/PendingLeaveAcceptance`,{
                id:leaveStatusId,
                status:leaveStatus,
    
    
            }).then((res)=>{
                alert(res);
            })
        } catch(e) {
              console.log(e);
        }
        getData();
        setModalApproveVisible(false);
        setModalCancelVisible(false);

        
    }
    const modalApproveVisibility=()=>{
        setModalApproveVisible(false);
        
    }
    const modalVisibility = ()=>{
        setModalCancelVisible(false);

    }
    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          
          // console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/PendingLeaveApi`,{}).then((res)=>{

            setUserData(res.data);
            // console.log(res.data);
            // setUserData(res.data);
            
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
      
      
      
      <View style={{display:"flex",alignItems:'center',justifyContent:"center",borderWidth:1,borderColor:"#00000099",backgroundColor:"#c5e3f6",paddingTop:15,paddingBottom:15}}>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>Leave Status Report</Text>
        <Text style={{fontSize:12,color:"#00000099",textAlign:'center'}}>( This is the report of all pending leave requests you can approve or reject these requests on clicking check or cross button)</Text>
        {/* <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>({`${reportTitleDate.getDate()}/${reportTitleDate.getMonth()+1}/${reportTitleDate.getFullYear()}`})</Text> */}
      </View>
      <ModalReport modalStatus={modalCancelVisible} setModalStatus={modalVisibility} leaveStatus={postLeaveStatus} />
      <ModalApproveReport modalStatus={modalApproveVisible} setModalStatus={modalApproveVisibility} leaveStatus={postLeaveStatus} />
      
      <DataTable style={{borderWidth:1,borderColor:"#00000099"}} >
        <DataTable.Header style={{backgroundColor:"#c5e3f6",borderBottomWidth:1,borderColor:"#00000099"}}>
          
          <DataTable.Title ><Text style={{color:"#00000099"}}>Name</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>From</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>To</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>Status</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>Approve</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>Reject</Text></DataTable.Title>
         
         
        </DataTable.Header>
        {
            userData.map((data,index)=>{
                return(
                    <DataTable.Row key={index}>
                
                        <DataTable.Cell ><Text style={{fontSize:10}} numberOfLines={3}>{data.name}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}} numberOfLines={3}>{data.datefrom}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}}numberOfLines={3}>{data.dateto}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}}numberOfLines={3}>{data.status}</Text></DataTable.Cell>
                        
                        <View style={{backgroundColor:"#06d6a010",margin:2,padding:0,borderRadius:50,alignItems:'center',justifyContent:'center'}}><IconButton onPress={()=>modalApprove(data.id)} icon="check" size={16} color={Colors.green500}/></View>
                        <View style={{backgroundColor:"#ff4d6d10",margin:2,padding:0,borderRadius:50,alignItems:'center',justifyContent:'center'}}><IconButton onPress={()=>modalReject(data.id)} icon="close" size={16} color={Colors.red900} /></View>
                         
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