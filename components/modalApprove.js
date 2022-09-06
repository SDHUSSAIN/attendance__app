import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export  default  function ModalApproveReport ({modalStatus,setModalStatus,leaveStatus}){
  
    
    
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Approve</Text>
            <Text style={styles.modalText}>Are you sure you want to approve this ?</Text>
            <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonAllow]}
              onPress={leaveStatus}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={setModalStatus}
            >
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
     
    </View>
  );
};


    


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonContainer:{
        flexDirection:'row',
    

    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#ff4d6d",
      flexGrow:1,
      margin:10,
    },
    buttonAllow:{
        backgroundColor: "#06d6a0",
      flexGrow:1,
      margin:10,

    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 20,
      textAlign: "center"
    },
    modalTitle:{
        fontSize:25,
        fontWeight:'bold',
        marginBottom:20,
    }
  });