import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { NeuButton, NeuSwitch, NeuText, NeuView } from 'expo-neumorphism-ui';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <NeuView
        innerContainerStyle={{
          borderRadius: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        outerContainerStyle={{ borderRadius: 1000 }}
        height={40}
        width={200}
      >
        <NeuText>NEUMORPHISM</NeuText>
      </NeuView>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
        <NeuButton
          suffixIcon={<Feather name="send" size={22} />}
          onPress={() => console.log('HELLO!')}
          style={{ marginBottom: 100 }}
        >
          Press Me
        </NeuButton>
        <NeuSwitch accentColor="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    gap: 30,
    // justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
