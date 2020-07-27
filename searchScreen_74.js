import React from 'react';
import { Text, View, FlatList,TextInput,TouchableOpacity ,StyleSheet} from 'react-native';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';  

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null,
      search:''
    }
  }
  
  fetchMoreTransactions=async()=>{
    var text=this.state.search.toUpperCase()
    var enteredText= text.split("")
    if (enteredText[0].toUpperCase()==='B') {
      const query = await db.collection('transaction').where('bookId','===',text).get()
      query.docs.map((docs)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }else if (enteredText[0].toUpperCase()==='S') {
      const query = await db.collection('transaction').where('studentId','===',text).get()
      query.docs.map((docs)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }

  }
  searchTransactions=async(text)=>{
    var enteredText= text.split("")
    var text=text.toUpperCase()
    if (enteredText[0].toUpperCase()==='B') {
      const transaction = await db.collection('transaction').where('bookId','===',text).get()
      transaction.docs.map((docs)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }else if (enteredText[0].toUpperCase()==='S') {
      const transaction = await db.collection('transaction').where('studentId','===',text).get()
      transaction.docs.map((docs)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }
  }
  componentDidMount=async()=>{
    const query =await db.collection("transactions").get();
    query.docs.map((docs)=>{
     // allTransactions:[...this.state.allTransactions,doc.data]
     this.setState({
      allTransactions: [],
      lastVisibleTransaction: doc
    })
    })

  }
    render() {
      <ScrollView>
        {this.state.allTransactions.map(()=>{
            return (
                  <View key={index}style={{borderBottomWidth:2}}>
                    <Text>{"Book Id"+transactions.bookId}</Text>
                    <Text>{"Student Id"+transactions.studentId}</Text>
                    <Text>{"Data"+transactions.date.date()}</Text>

                  </View>
                );
        })

        }
      </ScrollView>
        return(
              <View style={styles.container}>
                    <View style={styles.searchBar}>
                        <TextInput style={styles.bar} placeholder="Enter Student Id or Book Id"
                                onChangeText={(text)=>{this.setState({search:text})}}/>
                    </View>
                    <TouchableOpacity 
                        style={styles.searchButton}
                        onpress={()=>{this.searchTransactions(this.state.search)}}
                        >
                        <Text>Search</Text>
                    </TouchableOpacity>
              </View>,
              <FlatList 
                  data={this.state.allTransactions}
                  renderItem={({item})=>{
                    <View style={{borderBottomWidth:2}}>
                      <Text>{"Book Id"+item.bookId}</Text>
                      <Text>{"Student Id"+item.studentId}</Text>
                      <Text>{"Data"+item.date.date()}</Text>

                    </View>
                  }}
                  keyExtractor={(item,index)=>index.toString()}
                  onEndReached={this.fetchMoreTransactions}
                  onEndReachedThreshold={0.7}
              />
          ) /**/
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