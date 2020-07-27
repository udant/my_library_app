import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image ,  TextInput} from 'react-native';
import * as  Permissions from "expo-permissions";
import {BarCodeScanner} from 'expo-barcode-scanner';
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
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
        if (buttonState !== "normal" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          );
        }
  
        else if (buttonState === "normal"){
          return(
            <View style={styles.container}>
              <View>
                <Image
                  source={require("../assets/booklogo.jpg")}
                  style={{width:200, height: 200}}/>
                <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
              </View>
              <View style={styles.inputView}>
              <TextInput 
                style={styles.inputBox}
                placeholder="Book Id"
                value={this.state.scannedBookId}/>
              <TouchableOpacity 
                style={styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("BookId")
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
              <TextInput 
                style={styles.inputBox}
                placeholder="Student Id"
                value={this.state.scannedStudentId}/>
              <TouchableOpacity 
                style={styles.scanButton}
                onPress={()=>{
                  this.getCameraPermissions("StudentId")
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
              </View>
            </View>
          );
        }
      }
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
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
