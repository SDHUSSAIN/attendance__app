import React, { useState,useEffect } from 'react';
import axios  from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,SafeAreaView, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, DataTable,} from 'react-native-paper';



const optionsPerPage = [15];


export default function MonthlyAttendanceReport() {

    const [userData,setUserData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [reportMonth, setReportMonth] = useState(new Date().getMonth()+1);
    const [reportYear, setReportYear] = useState(new Date().getFullYear());
    const [reportTitleMonth,setReportTitleMonth] = useState(new Date().getMonth()+1);

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    
 
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const [yearopen, setyearOpen] = useState(false);
    const [yearvalue, setyearValue] = useState(null);
    const [yearitems, setyearItems] = useState([
        {label: '2021', value: '2021'},
        {label: '2022', value: '2022'},
        {label:'2023', value:'2023'},
        {label:'2024', value:'2024'},
        {label:'2025', value:'2025'},
        
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'January', value: 1},
        {label: 'February', value: 2},
        {label:'March', value:3},
        {label:'April', value:4},
        {label:'May', value:5},
        {label:'June', value:6},
        {label:'July', value:7},
        {label:'August', value:8},
        {label:'September', value:9},
        {label:'October', value:10},
        {label:'November', value:11},
        {label:'December', value:12},
    ]);

    var mobileNo;
    var subDomain;    
    var currentMonth = new Date().getMonth()+1;
    var currentYear = new Date().getFullYear();
    



    const getData = async () => {
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
          
          // console.log(reportMonth);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/MonthlyReportApi?mobile=${mobileNo}&month=${reportMonth}&year=${reportYear}`,{}).then((res)=>{

            setUserData(res.data);
            // console.log(res.data);
            // setUserData(res.data);
            
          })
        } catch(e) {
            console.log(e);
        }
    }

    const getDatewiseData = async()=>{
      
      if(reportMonth<=currentMonth && reportYear<=currentYear){
        try {
          let user = await AsyncStorage.getItem('user');  
          let parsed = JSON.parse(user);  
  
          mobileNo = parsed.userMobile;
          subDomain = parsed.subDomain;
  
         
        //   setReportTitleDate(date);
        //   console.log(reportYear);
          // console.log(reportTitleMonth);
            setReportTitleMonth(reportMonth) ;
          // console.log(mobileNo);
          axios.get(`https://${subDomain}.vaimssolutions.com/api/MonthlyReportApi?mobile=${mobileNo}&month=${reportMonth}&year=${reportYear}`,{}).then((res)=>{
  
            setUserData(res.data);
            // console.log(res.data);
            // setUserData(res.data);
            
          })
        } catch(e) {
            console.log(e);
        }
  
      }else{
        alert("Report year and month can not be greater than current year and month");
      }
      
    }
    
    useEffect(() => {
        getData(); 
    }, []);

    

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <View style={styles.dateContainer}>
      <DropDownPicker
                            open={yearopen}
                            value={yearvalue}
                            items={yearitems}
                            setOpen={setyearOpen}
                            setValue={setyearValue}
                            setItems={setyearItems}
                            onChangeValue={(value)=>setReportYear(value)}
                            placeholder={currentYear}
                            containerStyle={{width:150}}
                        />
      <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={(value)=>setReportMonth(value)}
                            placeholder={monthNames[currentMonth-1]}
                            containerStyle={{width:200}}
                        />
       
      
        
    </View>

      
      <ScrollView keyboardDismissMode="on-drag">
      
      
      <View style={{marginBottom:30}}><Button onPress={getDatewiseData} style={{borderWidth:1,borderColor:"#00000099",}}>Click To View Report</Button></View>
      <View style={{display:"flex",alignItems:'center',justifyContent:"center",borderWidth:1,borderColor:"#00000099",backgroundColor:"#c5e3f6",paddingTop:15,paddingBottom:15}}>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>Monthly Attendance Report</Text>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#00000099"}}>({`${monthNames[reportTitleMonth-1]}-${reportYear}`})</Text>
      </View>
      
      <DataTable style={{borderWidth:1,borderColor:"#00000099"}} >
        <DataTable.Header style={{backgroundColor:"#c5e3f6",borderWidth:1,borderColor:"#00000099"}}>
          {/* <DataTable.Title>S.no</DataTable.Title> */}
          <DataTable.Title ><Text style={{color:"#00000099"}}>Emp.ID</Text></DataTable.Title>
          <DataTable.Title style={{minWidth:"15%"}}><Text style={{color:"#00000099"}}>Emp.Name</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>P.Days</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>A.Days</Text></DataTable.Title>
          <DataTable.Title ><Text style={{color:"#00000099"}}>L.Days</Text></DataTable.Title>
          
          
         
         
        </DataTable.Header>
        
        {
            userData.map((data,index)=>{
                return(
                  
                    <DataTable.Row key={index}>
                        {/* <DataTable.Cell><Text style={{fontSize:10}}>{data.sno}</Text></DataTable.Cell> */}
                        <DataTable.Cell ><Text style={{fontSize:10,}} >{data.employeeid}</Text></DataTable.Cell>
                        <DataTable.Cell style={{minWidth:"15%"}}><Text style={{fontSize:10}} >{data.name}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}}>{data.present}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}}>{data.absent}</Text></DataTable.Cell>
                        <DataTable.Cell ><Text style={{fontSize:10}}>{data.leave}</Text></DataTable.Cell>
                        
                        
                         
                    </DataTable.Row>
                  
                    
                    
                )

            })
        }
        <DataTable.Pagination
        page={page}
        numberOfPages={10}
        onPageChange={(page) => setPage(page)}
        label="Pages"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
        
      </DataTable>
      <View style={{marginTop:2500}}><Text>End of Report</Text></View>
      
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    // borderWidth:1,


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