import React,{useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios  from "axios";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import UserImagePicker from "../ImagePicker";

export default function userProfile() {
   
    const [ isloading,setIsLoading] = useState(true);
    const [userSubDomain,setUserSubDomain] = useState() ;
    const [userProfileData,setUserProfileData] = useState([]);
    var userMobile;
    var subDomain;
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

     

        getUserData().then((res)=>{
            subDomain = res.subDomain;
            userMobile = res.userMobile;
            setUserSubDomain(subDomain);

            axios.get(`https://${subDomain}.vaimssolutions.com/api/EmployeeProfileApi?mobile=${userMobile}`,{
            }).then((res) =>{
              
              setUserProfileData(res.data);
              
              setIsLoading(false);
                
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
        
        <SafeAreaView style={styles.container}>
            {isloading ? <ActivityIndicator/> : userProfileData.map((data,i)=>{
                return (
                    <ScrollView showsVerticalScrollIndicator={false} key={i}>
                {/* <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                </View> */}

                <View style={{ alignItems:"center",height:300}}>
                    <View style={styles.profileImage}>
                        <UserImagePicker userImagePath = {`https://${userSubDomain}.vaimssolutions.com/uploads/employeephoto/${data.photo}`}/>
                        
                    </View>
                    
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{data.designation}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 20 }]}>{data.employeeid}</Text>
                        <Text style={[styles.text, styles.subText]}>EmployeeID</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 20 }]}>{data.mobile}</Text>
                        <Text style={[styles.text, styles.subText]}>Contact No</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 20 }]}>{data.department}</Text>
                        <Text style={[styles.text, styles.subText]}>Department</Text>
                    </View>
                </View>

                {/* <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/login.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/login.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/login.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View>
                </View> */}
                <Text style={[styles.subText, styles.recent]}>Address</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                {data.address}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                {data.pincode}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView> 
                );
            })}
            
            
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        // fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        // width: 200,
        // height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});