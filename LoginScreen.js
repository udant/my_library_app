import React from 'react';
import { Text, View,TextInput,TouchableOpacity ,StyleSheet, KeyboardAvoidingView, Alert,Image} from 'react-native';
/*import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';  */

export default class Loginscreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
        emailId:'',
        password:''
    }
  }
  login=async(email,password)=>{
    if (email && password){
      try{
        const response = await firebase.auth().signInWithEmailAndPassword(email,password)
        if(response){
          this.props.navigation.navigate('Transaction')
        }
      }
      catch(error){
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert("user dosen't exists")
            console.log("doesn't exist")
            break
          case 'auth/invalid-email':
            Alert.alert('incorrect email or password')
            console.log('invaild')
            break   
        }
      }
    }
    else{
        Alert.alert('enter email and password');
    }
  }
    render() {
        return(
    <KeyboardAvoidingView>
         <Text>
             login
         </Text>
         <Image source={require("../assets/booklogo.jpg")}
         style={{width:200,height:200}}
         />
         <TextInput style={styles.bar}
          placeholder="abc@example.com"
          keyboardType='email-address'
            onChangeText={(text)=>{this.setState({emailId:text})}}/>

            <TextInput style={styles.bar}
          placeholder="enter password"
          secureTextEntry={true}
            onChangeText={(text)=>{this.setState({password:text})}}/>

            <View>
            <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
          onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
            <Text style={{textAlign:'center'}}>Login</Text>
          </TouchableOpacity>
            </View>
     </KeyboardAvoidingView>
        )
      }
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:20
    },
    searchBar:{
      flexDirection:"row",
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'gray'
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'gray'
    }
  })