import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { NeuButton } from 'expo-neumorphism-ui';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <NeuButton
        suffixIcon={<Feather name="send" size={22} />}
        onPress={() => console.log('HELLO')}
      >
        Press Me
      </NeuButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
