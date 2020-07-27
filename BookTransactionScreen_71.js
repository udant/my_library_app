/* Class 68 starts
import React from 'react';
import {Text,View} from 'react-native';

export default class TranasactionScreen extends React.Component  {
    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>
                    Issue or Return
                </Text>
            </View>
        );
    }
}
Class 68 ends
*/

import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import * as  Permissions from "expo-permissions";
import {BarCodeScanner} from 'expo-barcode-scanner';
import db from '../config.js';
import * as firebase from 'firebase';
export default class TranasactionScreen extends React.Component  {
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }
    getCameraPermission= async()=>{
        const {status} = await Permissions.askAsync(Permissions.Camera);
        this.setState({
            hasCameraPermissions:status ==='granted',
            buttonState:"clicked",
            scanned:false
        });
    }
    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        });
    }

    handleTransaction=async()=>{
        var transactionMessage
        db.collection("books").doc(this.state.scannedBookId.get()
        .then((doc)=>{
            // console.log(doc.data())
           var book = doc.data()
           if (book.bookAvailability) {
               this.initiateBookIssue();
               transactionMessage = "Book Issued"
           }
           else {

            this.initiateBookReturn;
            transactionMessage = "Book Returned"
           }
        })
        
        )
    }
    initiateBookIssue=async()=>{
        db.collection("transactions").add({
            'studentId':this.state.scannedStudentId,
            'bookId':this.state.scannedBookId,
            'date':firebase.firestore.Timestamp.now().toDate,
            'transactionType':"Issue"
        })  
        db.collection("books").doc(this.state.scannedBookId).update({
           'bookAvailability':false
        }) 
        db.collection("students").doc(this.state.scannedStudentId).update({
            'numberOfBooksIssued':firebase.firestore.FieldValue.increment(1)
         }) 
    }
    initiateBookReturn=async()=>{
        db.collection("transactions").add({
            'studentId':this.state.scannedStudentId,
            'bookId':this.state.scannedBookId,
            'date':firebase.firestore.Timestamp.now().toDate,
            'transactionType':"return"
        })  
        db.collection("books").doc(this.state.scannedBookId).update({
           'bookAvailability':true
        }) 
        db.collection("students").doc(this.state.scannedStudentId).update({
            'numberOfBooksIssued':firebase.firestore.FieldValue.increment(-1)
         }) 
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState
        if (buttonState==="clicked" && hasCameraPermissions) {
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            );
        }else if (buttonState === "normal") {
           
            return(
                <View style={styles.container}>
                    <Text  style={styles.displayText}>
                        {hasCameraPermissions===true ? this.state.scannedData:"Request Camera Permission"}
                    </Text>
                    <TouchableOpacity 
                    onPress={this.getCameraPermission}
                    style={styles.scanButton}
                    > 
                        <Text style={styles.buttonText}>
                            Scan QR Code
                        </Text>
                    </TouchableOpacity> 
            </View>
        );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline"
    },
    scanButton:{
        backgroundColor:"#2196F3",
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize: 20,
      }
  });
