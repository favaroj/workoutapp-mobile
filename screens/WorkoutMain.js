import React from 'react';

import {
    Image,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import { List, ListItem } from "react-native-elements";
var firebase = require("./../components/firebase.js");


const rows = [];


const extractKey = ({id}) => id


export default class WorkoutMain extends React.Component {

    constructor(props)
    {
        
        super(props);
        this.state = { 
            FlatListItems: [
                {title: 'Test', key: 'item1'},
            ],
            Workout1: [
                {title: 'Test', key: 'item1'},
            ],
            johnLoggedIn: true,
            meganLoggedIn: 'false',
            rows : [{id: 0, text: 'Default'}],
                
            
        }
        var params = this.props.navigation.state.params;
        
        this.userRef = this.getRef();

    }

   
   

    
    componentDidMount() {
        const { setParams } = this.props.navigation;
        //setParams({ user: 'User', workoutKey: 'Default' });

        if(setParams.johnLoggedIn) {
            this.johnLoggedIn.setState({johnLoggedIn: 'true'});
        } else if(setParams.meganLoggedIn) {
            this.meganLoggedIn.setState({meganLoggedIn: 'true'});
        }
        this.listenForItems(this.userRef);
        /*const rows = [
            {id: 0, text: 'Default'},
        ]*/

        //var userRef = firebase.ref('Users');
        //var johnRef = userRef.child('John');
        

        /*var self = this;
        var userRef = firebase.ref('Users');
        var johnRef = userRef.child('John');
        johnRef.on('child_added', function(snapshot) {
            var dateCompleted = snapshot.val().DateCompleted;
            var workoutName = snapshot.val().WorkoutName;
            var exercise1 = snapshot.val().Exercise1;
            var exercise2 = snapshot.val().Exercise2;
            var exercise3 = snapshot.val().Exercise3;
            var exercise4 = snapshot.val().Exercise4;
            var exercise5 = snapshot.val().Exercise5;
            var weight1 = snapshot.val().Weight1;
            var weight2 = snapshot.val().Weight2;
            var weight3 = snapshot.val().Weight3;
            var weight4 = snapshot.val().Weight4;
            var weight5 = snapshot.val().Weight5;
            var reps1 = snapshot.val().Reps1;
            var reps2 = snapshot.val().Reps2;
            var reps3 = snapshot.val().Reps3;
            var reps4 = snapshot.val().Reps4;
            var reps5 = snapshot.val().Reps5;
            var sets1 = snapshot.val().Sets1;
            var sets2 = snapshot.val().Sets2;
            var sets3 = snapshot.val().Sets3;
            var sets4 = snapshot.val().Sets4;
            var sets5 = snapshot.val().Sets5;
            var count = snapshot.numChildren();
            var key = snapshot.key;

            self.setState({ Workout1: [
                {   
                    title: workoutName, 
                    key: key,
                },   
            ]});   
        });*/
    }

    getRef() {
        //const {user} = this.props.navigation.state.params;
        const { params } = this.props.navigation.state;
        let user = params.user;
        let workoutKey = params.workoutKey;
        console.log(workoutKey);

        let meganRef = firebase.ref('Users/Megan');
        meganRef.on('child_added', function(snapshot) {
            key = snapshot.key;
            
        });
        alert(key);
        //alert(user + '');
        //const {navigate} = this.props.navigation;
        //if(this.props.user === 'John') {
        //if(this.state.johnLoggedIn) {
            return firebase.ref('Users/Megan').child(workoutKey);//.child(key);//.child('Megan');//.child("KsRCF5hAaOv0gwP9FXp");
        //} else if(this.props.meganLoggedIn){
            //return firebase.ref('Users').child('Megan');
        //}
    }

    listenForItems(userRef) {
        userRef.on('value',function(snapshot) {
            //var dateCompleted = snapshot.val().DateCompleted;
            var exerciseName = snapshot.val().Exercise1;
            //var count = snapshot.numChildren();
            var key = snapshot.key;
            console.log(exerciseName);
        
            rows.push({
                id: key,
                text: exerciseName
            });
        });
    }

    /*static navigationOptions = ({ navigation, user, johnLoggedIn }) => ({
        title: user + ' Workouts',
       });*/
    Ref() {
        alert('Test');
    }
    
    
    renderItem = ({item}) => {
        return (
            <View>
          <Text style={styles.row}>
            {item.id}
          </Text>
          <TouchableOpacity
          
          style = {styles.itemContainer}
          onPress = {() => alert(item.id)}>
          
          <Text style = {styles.listItem}>
             {item.text}
          </Text>
       </TouchableOpacity>
       </View>
        )
    }
    
    
    render() {
        const { params } = this.props.navigation.state;
        //this.getRef()
        //this.Ref();
        alert(params.user);
        const { navigation, screenProps } = this.props;
        return (
            <View style={styles.container}>
                <Text>{params.workoutKey}</Text>
                <Text>{params.user}</Text>
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

                <View style={styles.headerContainer}>
                    <Text style={styles.mainHeader}>{navigation.johnLoggedIn ? 'Logged In!': 'Not Logged In!'}</Text>
                </View>
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
        marginBottom: 30, 
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

