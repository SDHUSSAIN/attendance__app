import { Dimensions, StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display:'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding:0,
    height:"100%",
    backgroundColor:"#dee1ec",
    // paddingTop:50,
    
    // marginTop:"50%",
    // marginLeft:"10%"
  },
  loadingText:{
    textAlign:"center",
    paddingTop:20,
    fontSize:15,
  },
  locationTitleText:{
    fontWeight:"bold",
    fontSize:18,
    color:"#364f6b",
    textAlign:"left",
    paddingTop:10,
    paddingLeft:25,

  },

  big: {
    fontSize: 12,
    color: '#555eee',
    textAlign:"left",
    marginBottom:20,
    paddingHorizontal:30,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 25,
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    color: 'white',
  },
  mapContainer:{
    width:500,
    height:"75%",
    
    
  },
  mapView:{
    width:"100%",
    height:"100%",
  },
  attendanceBoard:{
    marginTop:-80,
    // height:"35%",
    width:"100%",
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    // bottom:0,
    // marginBottom:-80,

  },
  timeWrapper:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:30,
  },
  punchWrapper:{
    
  },
  punchText:{
    color:"#364f6b",
    fontWeight:"bold",
    fontSize:18,
    paddingBottom:5,
  },
  punchTime:{
    color:"#555eee",
    paddingBottom:30,
  },
  buttonWrapper:{
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center",
    paddingBottom:50,
    paddingHorizontal:20,
    marginTop:50,
  }

});


export default styles;