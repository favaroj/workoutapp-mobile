import React from 'react';

import {
    Image,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import { List, ListItem, Button, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
var firebase = require("./../components/firebase.js");


const rows = [];


const extractKey = ({id}) => id


export default class JohnScreen extends React.Component {

    constructor(props)
    {
        
        super(props);
        this.state = { 
            
                
            
        }
        
        this.userRef = this.getRef();

    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
        title: 'John Workouts',
        //headerRight: <Button title="Create" color="white" backgroundColor="#08373f"onPress={() => params.handleCreate}/>
        }
    };

    createWrkt = () => {
        alert('handleCreatePress Button pressed');
    }
    
    componentDidMount() {
        //const { setParams } = this.props.navigation;
        //setParams({ user: 'John', johnLoggedIn: true });
        this.props.navigation.setParams({ handleCreate: () => this.createWrkt() });

        this.listenForItems(this.userRef);
    }

    

    getRef() {
        return firebase.ref('Users').child('John');
    }

    listenForItems(userRef) {
        userRef.on('child_added',function(snapshot) {
            var dateCompleted = snapshot.val().DateCompleted;
            var workoutName = snapshot.val().WorkoutName;
            var count = snapshot.numChildren();
            var key = snapshot.key;
        
            rows.push({
                id: key,
                text: workoutName
            });
        });
    }


    

    
    
    renderItem = ({item}) => {
        return (
          /*<Text style={styles.row}>
            {item.text}
          </Text>*/
          <TouchableOpacity
          
          style = {styles.itemContainer}
          onPress = {() => alert(item.id)}>
          
          <Text style = {styles.listItem}>
             {item.text}
          </Text>
       </TouchableOpacity>
        )
    }
    
    
    render() {
        const { params } = this.props.navigation.state;
        
        //alert(this.props.user);
        const { navigation, screenProps } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.topBtnContainer}>
                <Icon
                    raised
                    name= 'add-box'
                    onPress={this.createWrkt}/>
                <Icon
                    raised
                    name= 'date-range' 
                    onPress={this.createWrkt}/>
                </View>
                

                <FlatList
                //data={this.state.Workout1}
                data={rows}
                //renderItem={({item}) => 
                renderItem={this.renderItem}
                keyExtractor={extractKey}
                /*<View style={styles.itemContainer}>
                <TouchableOpacity
                     key = {item.key}
                     style = {styles.itemContainer}
                     onPress = {() => alert(item.key)}>
                     
                     <Text style = {styles.listItem}>
                        {item.title}
                     </Text>
                  </TouchableOpacity>
                    
                </View>
                }*/
              />

                {/*<View style={styles.headerContainer}>
                    <Text style={styles.mainHeader}>{navigation.johnLoggedIn ? 'Logged In!': 'Not Logged In!'}</Text>
                </View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#08373f',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
      },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnContainer: {
        flexDirection: 'row',
    },
    mainHeader: {
        fontSize: 35,
        color: 'white',
        lineHeight: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listItem: {
        fontSize: 35,
        color: 'white',
        lineHeight: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: '#48BBEC',
        marginTop: 30,
        padding:10, 
        height:65, 
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15, 
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 4,
        borderRadius: 2,
        borderColor: '#a3ddf5',
        borderBottomWidth: 0,
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
      },
});

