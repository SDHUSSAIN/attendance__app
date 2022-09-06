import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
       flex:1,
       marginTop:50,
    //    justifyContent:"center",
    //    backgroundColor:"red",    
    },
    titleContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        margin:5,
        
        backgroundColor:"#2f89fc",
        borderWidth:1,
        borderRadius:4,
        borderColor:"#dee1ec", 
    },
    cardContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:5,
        paddingRight:5,
        margin:5,
        
        borderWidth:1,
        borderColor:"#dee1ec",
        
    },
    iconContainer:{
        borderRadius:50,
        backgroundColor:"#00000020",
        padding:10,
        marginRight:10,
    },
    reportHeading:{
        fontSize:16,
        fontWeight:"bold",
        color:"#00000099"
    },
    detailsContainer:{
        width:0,
        flexGrow:1,
        flex:1,
        padding:5,
    },
    reportDescription:{
        fontSize:10,
        
    }


})

export default styles;