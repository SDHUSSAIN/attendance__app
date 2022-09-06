


import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#f7f7f7",
        // width:"100%",
        
    },
    headerWrapper:{
        backgroundColor:"#5566ee",
        // borderBottomLeftRadius:30,
        // borderBottomRightRadius:30,
        paddingTop:30,
        paddingBottom:30,
        alignItems:"center",
        justifyContent:"center"
        // zIndex:10,

    },
    header:{

        padding:20,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",    

    },
    iconWhite:{
        color:"#fff",
        // paddingRight:120,
        left:0,

    },
    headerText:{
        fontWeight:"600",
        color:"#fff",
        fontSize:48,

    },
    iconImg:{
        flexDirection:"column",
        paddingTop:55,
        paddingBottom:120,
        alignItems:"center",
        alignItems:"center",
        justifyContent:"center",
        color:"#fff",
        
    },
    content:{
        marginHorizontal:20,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:-60,
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
        color:'#2d2d2d',
        paddingVertical:20,
        
    },
    input:{
        fontWeight:"500",
        borderBottomWidth:2,
        borderBottomColor:"#dddddd",
        fontSize:16,
        // paddingTop:80,
        marginBottom:20,
        paddingVertical:10,
        flexDirection:"row",
    },
    description:{
        color:"#989898",
        textAlign:"center",
        fontSize:18,
        padding:20,
        fontWeight:"500",
    },
    buttonWrapper:{
        alignItems:"center",
        marginVertical:30,
    },
    button:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#5566ee",
        width:70,
        height:70,
        borderRadius:50,
        
    },
   
    iconButton:{
        color:"#fff",
    }


})


export default styles;
