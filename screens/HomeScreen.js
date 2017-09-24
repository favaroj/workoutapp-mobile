import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
//import Button from 'react-native-button';

console.ignoredYellowBox = [
  'Setting a timer'
]

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

constructor(props) {
super(props);
this.state = {
  johnLoggedIn: false,
  meganLoggedIn: false,
}
}  
componentDidMount() {
  const { setParams } = this.props.navigation;
  setParams({ user: 'User', workoutKey: 'Default', meganLoggedIn: false });
}
  static navigationOptions = {
    header: null,
  };

  

  _handleJPress() {
    const { navigate } = this.props.navigation;
    alert('Welcome John!');
    navigate('Workouts', { user: 'John', johnLoggedIn: true })
  }

  _handleMPress() {
    const { navigate } = this.props.navigation;
    alert('Welcome Megan!');
    navigate('Workouts', { user: 'Megan', meganLoggedIn: true })
  }

  render() {
    const { navigate } = this.props.navigation;
    
    
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/weightlifting.png')
                /*__DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              */
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>J&M Workout</Text>
          </View>  

          <View style={styles.buttonContainer}>
            <TouchableHighlight
            style={styles.mainButton}
            onPress={() => this._handleJPress()}>
            {/*onPress={() => navigate('Workouts', { user: 'John', johnLoggedIn: true })}>*/}
            <Text style={styles.buttonText}>John</Text>
            </TouchableHighlight>

            <TouchableHighlight
            style={styles.mainButton}
            onPress={() => this._handleMPress()}>
            {/*onPress={() => navigate('Workouts', { user: 'Megan', meganLoggedIn: true })}>*/}
            <Text style={styles.buttonText}>Megan</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>  
      </View>
    );
  }

  

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08373f',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  mainButton: {
    padding:10, 
    height:45, 
    overflow:'hidden', 
    borderRadius: 20, 
    backgroundColor: '#48BBEC',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: 'white',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    /*marginLeft: -10,*/
  },
  headerContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 35,
    color: 'white',
    lineHeight: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
