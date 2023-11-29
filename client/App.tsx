import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import TestComponent from '@/components/TestComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <TestComponent name={'David'} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf2',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
