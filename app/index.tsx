import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, SafeAreaView, Platform } from 'react-native';
import { GoogleSignin,  isErrorWithCode, isSuccessResponse, statusCodes , GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth'; 




export default function index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '206051169329-6ev1pgkdvreesocpj9tc3kegib0efn53.apps.googleusercontent.com',
  });

  useEffect(() => {


    // for web client id
    // if (Platform.OS === 'web') {
    // // firebase.initializeApp({
    // //   databaseURL: "https://firebase-app-b8cd7-default-rtdb.firebaseio.com",
    // //   apiKey: "AIzaSyB3IDzBIH3qIBmNOGfxPcX0TaRd9KLnQHM",
    // //   authDomain: "firebase-app-b8cd7.firebaseapp.com",
    // //   projectId: "firebase-app-b8cd7",
    // //   storageBucket: "firebase-app-b8cd7.appspot.com",
    // //   messagingSenderId: "206051169329",
    // //   appId: "1:206051169329:ios:1f5d3b5f0831d7c3f80fc9",
    // // });
    
    // }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const handleLogin = () => {
    // Simple validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    // Dummy login logic
    Alert.alert('Login', `Logged in as ${email}`);
  };    

  const signIn = async () => {
    try {

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const response = await GoogleSignin.signIn();
        console.log(response);
      const googleCredential = auth.GoogleAuthProvider.credential(response.data?.idToken || null);

      const user = await auth().signInWithCredential(googleCredential);

      console.log(user);


    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };


 
   // Handle user state changes
   function onAuthStateChanged(user: any) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
 
  
   if (initializing) return null;
 
   if (!user) {
    return (
      <SafeAreaView style={styles.container} >
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          testID="emailInput"
        />
  
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          testID="passwordInput"
        />
       <Button title="Sign in with Google" onPress={signIn} />
        <Button title="Login" onPress={handleLogin} testID="loginButton" />
        
      </SafeAreaView>

    );
  }
 
return (
     <View>
       <Text>Welcome</Text>
     </View>
   );
 
 
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});