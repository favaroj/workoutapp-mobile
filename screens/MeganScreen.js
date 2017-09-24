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
import Display from 'react-native-display';
import RadioButton from 'radio-button-react-native';

var firebase = require("./../components/firebase.js");


const rows = [];
const setButtons1 = [];

const extractKey = ({id}) => id


export default class MeganScreen extends React.Component {

    constructor(props)
    {
        
        super(props);
        this.state = { 
            enable: true,
            value: -1,
            
        }
        
        this.userRef = this.getRef();

    }

    /*static navigationOptions = ({ navigation, user }) => ({
        title: user + '',
       });*/
   

    
    componentDidMount() {
        const { setParams } = this.props.navigation;
        setParams({ user: 'Megan', workoutKey: 'Default' });

        this.listenForItems(this.userRef);
    }

    getRef() {
        return firebase.ref('Users').child('Megan');
    }

    listenForItems(userRef) {
        userRef.on('child_added',function(snapshot) {
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
            var key = snapshot.key;
        
            rows.push({
                id: key,
                workoutName: workoutName,
                exercise1: exercise1,
                exercise2: exercise2,
                exercise3: exercise3,
                exercise4: exercise4,
                exercise5: exercise5,
                sets1: sets1
            });
            for(let i = 0; i < sets3; i++) {
                setButtons1.push(
                    <View key={i} style={styles.circleContainer}>
                        <View style={styles.circle}>
                            <Text>{i}</Text>
                        </View>
                          
                    </View>
                );
            }
            

        });
    }

    handleCreatePress() {
        alert('handleCreatePress Button pressed');
    }

    static navigationOptions = {//({ navigation }) => ({
        title: 'Megan Workouts',
        /*headerRight: <Button title="Create" color="white" backgroundColor="#08373f"onPress={() => this.handleCreatePress()}/>,
        */
        } 
    //});
    goToWrkt() {
        //alert('Test');
        /*return (
            <Text style={styles.listItem}>Test Text</Text>
        )*/
        let toggle = !this.state.enable;
        this.setState({enable: toggle});
        /*this.setState({
            enable: true,
        });*/
    }

    handleOnPress(value){
        this.setState({value:value})
    }
    
    renderItem = ({item}) => {
        const { navigate } = this.props.navigation;
        return (
          
          <View style={styles.rowContainer}>
              <Text style={styles.row}>
            {item.workoutName}
          </Text>

          <TouchableOpacity     
          style = {styles.itemContainer}
          //onPress = {this.goToWrkt.bind(this)}>
          onPress= {() => navigate('WorkoutMain', {workoutKey: item.id, user: 'Megan'})}>
          <View style={styles.exerciseContainer}>
            <Text style = {styles.listItem}>
             {item.exercise1}
            </Text> 
            <Text style = {styles.listItem}>
             {item.sets1}
            </Text> 
              
          </View>
        <View style={styles.exerciseContainer}>
        {setButtons1}
        </View>
              
       </TouchableOpacity>

       <TouchableOpacity    
          style = {styles.itemContainer}
          //onPress = {this.goToWrkt.bind(this)}>
          onPress= {() => navigate('WorkoutMain', {workoutKey: item.id, user: 'Megan'})}>
          <Text style = {styles.listItem}>
             {item.exercise2}
          </Text>   
       </TouchableOpacity>

       <TouchableOpacity    
          style = {styles.itemContainer}
          //onPress = {this.goToWrkt.bind(this)}>
          onPress= {() => navigate('WorkoutMain', {workoutKey: item.id, user: 'Megan'})}>
          <Text style = {styles.listItem}>
             {item.exercise3}
          </Text>   
       </TouchableOpacity>

       <TouchableOpacity    
          style = {styles.itemContainer}
          //onPress = {this.goToWrkt.bind(this)}>
          onPress= {() => navigate('WorkoutMain', {workoutKey: item.id, user: 'Megan'})}>
          <Text style = {styles.listItem}>
             {item.exercise4}
          </Text>   
       </TouchableOpacity>

       <TouchableOpacity    
          style = {styles.itemContainer}
          //onPress = {this.goToWrkt.bind(this)}>
          onPress= {() => navigate('WorkoutMain', {workoutKey: item.id, user: 'Megan'})}>
          <Text style = {styles.listItem}>
             {item.exercise5}
          </Text>   
       </TouchableOpacity>
       
           {/*<Display enable={this.state.enable}>
           <Text>Test Text</Text>
       </Display>*/}
       </View>
        )
    }

    getInitialState(){
        return {
          viewOne: true,
          enable: false,
        }
      }
    
    changeView(){
         this.setState({
           viewOne: !this.state.viewOne
         })
    }
    
    createWrkt() {
        alert('Create Button Pressed!');
    }
    render() {
        const { params } = this.props.navigation.state;
        
        //alert(this.props.user);
        const { navigation, screenProps } = this.props;
        if(!this.state.viewOne) return <View style={styles.container}>
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

        
    </View>
        return (
            <NewView changeView={ () => this.changeView() } />
            
        );
    }
}

var NewView = React.createClass({
    render(){
      return(
        <View>
          <Text onPress={this.props.changeView}> the View is now changed </Text>
        </View>
      );
    }
  });

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
    circle: {
        marginTop: 10,
        marginBottom: 5,
        marginRight: 5,
        width: 30,
        height: 30,
        borderRadius: 100/2,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    circleContainer: {
        flexDirection: 'row'
    },
    exerciseContainer: {
        flexDirection: 'row'
    },
    mainHeader: {
        fontSize: 35,
        color: 'white',
        lineHeight: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listItem: {
        fontSize: 15,
        color: 'white',
        lineHeight: 15,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    itemContainer: {
        backgroundColor: '#48BBEC',
        marginTop: 15,
        padding:10, 
        height:80, 
        width: 250,
       
        marginBottom: 5, 
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
        marginTop: 10,
        backgroundColor: 'skyblue',
        
      },
    rowContainer: {
        alignItems: 'stretch',
        
    },
    createWrktBtn: {
        backgroundColor: '#48BBEC',
        borderWidth: 4,
        borderRadius: 2,
    },
});

