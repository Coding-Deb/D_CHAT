import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Statedata from './SRC/Context/State'
import AllChatPage from './SRC/Screens/Pages/AllChatPage';
import OnboardingPage from './SRC/Screens/Pages/OnboardingPage';
import AllGroupPage from './SRC/Screens/Pages/AllGroupPage';
import AboutPage from './SRC/Screens/Pages/AboutPage';
import UserNames from './SRC/Screens/Pages/UserNames';
import Login from './SRC/Screens/Auth/Login';
import Register from './SRC/Screens/Auth/Register';
import NotificationPage from './SRC/Screens/Pages/NotificationPage';
import AllPostPage from './SRC/Screens/Pages/AllPostPage';
import SearchPage from './SRC/Screens/Pages/SearchPage';
import UpdatePage from './SRC/Screens/Pages/UpdatePage';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <Statedata>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Onboarding'>
          <Stack.Screen name='AllChat' component={AllChatPage} options={{animation: 'slide_from_right'}} />
          <Stack.Screen name='AllGroup' component={AllGroupPage} options={{animation: 'slide_from_right'}} />
          <Stack.Screen name='AllPost' component={AllPostPage} options={{animation: 'slide_from_right'}} />
          <Stack.Screen name='About' component={AboutPage} options={{animation: 'slide_from_right'}} />
          <Stack.Screen name='UserName' component={UserNames} options={{animation: 'slide_from_bottom'}} />
          <Stack.Screen name='Login' component={Login} options={{animation: 'slide_from_left'}} />
          <Stack.Screen name='Register' component={Register} options={{animation: 'slide_from_left'}} />
          <Stack.Screen name='Notification' component={NotificationPage} options={{animation: 'slide_from_bottom'}} />
          <Stack.Screen name='Search' component={SearchPage} options={{animation: 'slide_from_bottom'}} />
          <Stack.Screen name='Update' component={UpdatePage} options={{animation: 'slide_from_bottom'}} />
          <Stack.Screen name='Onboarding' component={OnboardingPage} />
        </Stack.Navigator>
      </NavigationContainer>
     </Statedata>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
