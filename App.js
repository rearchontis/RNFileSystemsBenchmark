import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Button, View } from 'react-native';
import { remove } from './fs-functions/remove';
import { append } from './fs-functions/append';
import { write } from './fs-functions/write';
import { _measure } from './fs-functions/_measure';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function App() {
  const content = lorem.repeat(1024 * 11.5); // nearly 5mb

  const measuredWrite = _measure(write);
  const measuredAppend = _measure(append);

  const measuredAppendXTimes = async (times,plugin, path, content) => {
    const executionTimes = [];

    for (let i = 0; i < times; i++) {
      const [_, executionTime] = await measuredAppend(plugin, path, content);
      
      executionTimes.push(executionTime);
    }

    const sum = executionTimes.reduce((prev, curr) => prev + curr, 0);
    const avg = sum / times;

    console.log(`Run 'append' with ${plugin} ${times} times in ${sum.toFixed(3)}ms with mean ${avg.toFixed(3)}ms`);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Button title={'Write with Expo'} onPress={() => measuredWrite('expo', 'expo.txt', '')} />
          <Button title={'Write with RNFS'} onPress={() => measuredWrite('rnfs', '/rnfs.txt', '')} />
          <Button title={'Write with RNFA'} onPress={() => measuredWrite('rnfa', '/rnfa.txt', '')} />
          
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Button title={'Append 5 mb with Expo'} onPress={() => measuredAppend('expo', 'expo.txt', content)} />
          <Button title={'Append 5 mb with RNFS'} onPress={() => measuredAppend('rnfs', '/rnfs.txt', content)} />
          <Button title={'Append 5 mb with RNFA'} onPress={() => measuredAppend('rnfa', '/rnfa.txt', content)} />
          
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Button title={'Append 100 mb with Expo'} onPress={() => measuredAppendXTimes(20, 'expo', 'expo.txt', content)} />
          <Button title={'Append 100 mb with RNFS'} onPress={() => measuredAppendXTimes(20, 'rnfs', '/rnfs.txt', content)} />
          <Button title={'Append 100 mb with RNFA'} onPress={() => measuredAppendXTimes(20, 'rnfa', '/rnfa.txt', content)} />
          
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          
          <Button title={'Remove with Expo'} onPress={() => remove('expo', 'expo.txt')} />
          <Button title={'Remove with RNFS'} onPress={() => remove('rnfs', '/rnfs.txt')} />
          <Button title={'Remove with RNFA'} onPress={() => remove('rnfa', '/rnfa.txt')} />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
