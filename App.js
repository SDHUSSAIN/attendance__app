import React from 'react';

import { View} from 'react-native';
import AdminReports from './components/AdminReports';
import DailyAttendanceReport from './components/AdminReports/ReportSummary/dailyAttendanceReport';
import EmployeeSummaryReport from './components/AdminReports/ReportSummary/employeeSummary';
import MonthlyAttendanceReport from './components/AdminReports/ReportSummary/monthlyAttendanceReport';
import LeaveStatusReport from './components/AdminReports/ReportSummary/leaveStatusReport';
import AppNavigator from './components/app.navigator';
import HelpScreen from './components/HelpScreen';
import Home from './components/Home';
import LocationScreen from './components/Location';
import Modal from './components/modalCancel';


export default function App() {
  return (
    
    <View style={{flex:1}}>
      <AppNavigator/>
      {/* <AdminReports/> */}
      {/* <DailyAttendanceReport/> */}
      {/* <MonthlyAttendanceReport/> */}
      {/* <EmployeeSummaryReport/> */}
      {/* <Home/> */}
      {/* <LocationScreen/> */}
      {/* <HelpScreen/> */}
      {/* <LeaveStatusReport/> */}
      {/* <Modal/> */}
    </View>
      
  );

}