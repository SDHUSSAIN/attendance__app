import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        height:"100%",
        backgroundColor:"#ffffff",
        
      },
      imageContainer:{
        width:"100%",
        height:"70%",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:40,
      },
      image:{
        width:250,
        height:300,
      },
      buttonWrapper:{
        alignItems:"center",
        justifyContent:"center",
      },
      loginButton:{
        backgroundColor:"#555eee",
        paddingHorizontal:100,
        paddingVertical:10,
        borderRadius:40,
        marginBottom:15,
      },
      logoutButton:{
        backgroundColor:"orange",
        paddingHorizontal:130,
        paddingVertical:10,
        borderRadius:40,
        marginTop:15,

      }

});


export default styles;