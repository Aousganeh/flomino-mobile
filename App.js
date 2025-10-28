import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import MissionScreen from './src/screens/MissionScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import ShopScreen from './src/screens/ShopScreen';
import CustomBottomTabBar from './src/components/CustomBottomTabBar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomBottomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen 
            name="Mission" 
            component={MissionScreen}
            options={{
              tabBarLabel: 'Mission',
            }}
          />
          <Tab.Screen 
            name="Leaderboard" 
            component={LeaderboardScreen}
            options={{
              tabBarLabel: 'Leaderboard',
            }}
          />
          <Tab.Screen 
            name="Shop" 
            component={ShopScreen}
            options={{
              tabBarLabel: 'Shop',
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={HomeScreen}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;