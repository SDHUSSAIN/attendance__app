import React from 'react';
import {View,Text,SafeAreaView,ScrollView} from 'react-native';
import { Button } from 'react-native-paper';

import FileIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PersonIcon from "react-native-vector-icons/MaterialIcons";
import styles from './style';


export default function AdminReports({navigation}){


    const dailyReport =()=> navigation.navigate("dailyAttendanceReport");
    const monthlyReport =()=> navigation.navigate("monthlyAttendanceReport");
    const employeeSummaryReport =()=> navigation.navigate("employeeSummary");
    const leaveReport =()=> navigation.navigate("leaveStatusReport");
    return(
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize:30,fontWeight:"bold",color:"#ffffff"}}>Your Reports</Text>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.iconContainer}>
                            <FileIcon name="file-chart" size={30} color={"blue"}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.reportHeading}>Daily Attendance Report</Text>
                            <Text style={styles.reportDescription}>You can view here daily attendance of your employee of today or any previous day you want. </Text>

                        </View>
                        <Button onPress={dailyReport} ><Text>View</Text></Button>

                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.iconContainer}>
                            <FileIcon name="view-dashboard-outline" size={30} color={"#21e6c1"}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.reportHeading}>Monthly Attendance Report</Text>
                            <Text style={styles.reportDescription}>You can view here daily attendance of your employee of today or any previous day you want. </Text>

                        </View>
                        <Button onPress={monthlyReport} ><Text>View</Text></Button>

                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.iconContainer}>
                            <PersonIcon name="person-search" size={30} color={"#22d1ee"}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.reportHeading}>Employee Summary</Text>
                            <Text style={styles.reportDescription}>You can view here daily attendance of your employee of today or any previous day you want. </Text>

                        </View>
                        <Button onPress={employeeSummaryReport} ><Text>View</Text></Button>

                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.iconContainer}>
                            <PersonIcon name="pending-actions" size={30} color={"#f9ff21"}/>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.reportHeading}>Pending Leave Report</Text>
                            <Text style={styles.reportDescription}>You can view here daily attendance of your employee of today or any previous day you want. </Text>

                        </View>
                        <Button onPress={leaveReport} ><Text>View</Text></Button>

                    </View>
                    
                </ScrollView>
            </SafeAreaView>

        </View>

    );
}

