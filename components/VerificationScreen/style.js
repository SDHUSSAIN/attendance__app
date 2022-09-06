import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        // flex:1,
        paddingVertical:20,
        // paddingHorizontal:30,
        backgroundColor:"#555eee",
        height:"100%"
        
    },
    iconContainer:{
       alignItems:"center",
       justifyContent:"center",
       height:"45%", 
       
    },
    icon:{
        color:"#fff",
        backgroundColor:"#ecfffb25",
        paddingHorizontal:40,
        paddingVertical:40,
        borderRadius:100,
    },

    img:{
        width:200,
        height:200,
        borderRadius:100,
        paddingHorizontal:30,
        paddingVertical:30,

    },
    titleText:{
        color:"#303a52",
        alignItems:"center",
        justifyContent:"center",
        fontSize:20,
        textAlign:"center",
        
        paddingTop:20,
    },
    subtitleText:{
        color:"#303a52",
        alignItems:"center",
        justifyContent:"center",
        fontSize:20,
        textAlign:"center",
        paddingBottom:60,

    },
    infoContainer:{
        backgroundColor:"#fff",


    },
    inputBoxWrapper:{
        flexDirection:"row",
        // alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"#fff",
        // height:"30%",
        // paddingHorizontal:30,
        marginBottom:60,
    },
    inputBox:{
        borderBottomWidth:2,
        width:"80%",
        // height:"100%",
        borderColor:"#555eee",
        // borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:10,
        fontSize:30,

    },
    buttonWrapper:{
        justifyContent:"space-evenly",
        backgroundColor:"#fff",
        alignItems:"center",
        height:"25%",
      
        paddingHorizontal:30,

    },

    button:{
        width:"50%",
        paddingHorizontal:10,
        paddingVertical:15,
        backgroundColor:"#555eee",
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
        color:"#fff",
        fontSize:18,
        fontWeight:"700",

    }

})

export default styles;