import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/AppNavigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </NativeBaseProvider>
    
  );
}