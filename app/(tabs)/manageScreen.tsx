import { View, Text, StyleSheet } from 'react-native';

export default function ManageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Screen</Text>
      <Text style={styles.subtitle}>This is a simple manage screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
