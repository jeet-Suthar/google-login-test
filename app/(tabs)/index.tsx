import React from 'react';
import { View, Text, Button, StyleSheet , SafeAreaView} from 'react-native';

export default function HomeScreen() {
  const handleSignOut = () => {
    // Add your sign out logic here
    alert('Signed out!');
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
