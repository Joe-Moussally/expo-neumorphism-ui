import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'expo-neumorphism-ui';
import NeuView from './components/neu-view/NeuView';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Result: {result}</Text> */}
      <NeuView pressable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f2f2f2"
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
