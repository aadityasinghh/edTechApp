import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import Signup from '../Screens/ScreenSignup/ScreenSignup';
import Login from '../Screens/ScreenLogin/ScreenLogin';
import SubscriptionPage from '../Screens/ScreenSubscription/ScreenSubscription';
import DownloadedVideosScreen from '../Screens/ScreenDownloads/ScreenDownloads';
import WelcomePage from '../Screens/ScreenWelcome/ScreenWelcome';
import ScreenLanding from '../Screens/ScreenLanding/ScreenLanding';
import ScreenVideoPlayer from '../Screens/ScreenVideoPlayer/ScreenVideoPlayer';
import HomeScreen from '../Screens/ScreenHome/ScreenHome';
import { AppStackParamList, AuthStackParamList, RootStackParamList } from '../utils/interfaces/types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuthAndSubscriptionCheck } from './useAuthAndSubscriptionCheck';
import SplashScreen from '../Screens/ScreenSplash/SplashScreen';
import { createSelector } from 'reselect';
import { styles } from '../Screens/ScreenSplash/SplashStyle';
import LottieView from 'lottie-react-native';
import WatchlistScreen from '../Screens/ScreenWatchlist/WatchlistScreen';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const SubStack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Landing">
    <AuthStack.Screen name="Landing" component={ScreenLanding} options={{headerShown: false}} />
    <AuthStack.Screen name="Login" component={Login} options={{headerShown: false}} />
    <AuthStack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
  </AuthStack.Navigator>
);

const SubscribedNavigator = () => (
  <AppStack.Navigator initialRouteName="Home">
    <AppStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    <AppStack.Screen name="Video" component={ScreenVideoPlayer} options={{headerShown: false}} />
    <AppStack.Screen name='Watchlist' component={WatchlistScreen} options={{headerTitle: 'Watchlist'}}/>
    <AppStack.Screen name="Downloads" component={DownloadedVideosScreen} options={{headerTitle: 'Downloads'}} />
  </AppStack.Navigator>
);

const UnsubscribedNavigator = () => (
  <SubStack.Navigator initialRouteName="WelcomePageSub">
    <SubStack.Screen name="WelcomePageSub" component={WelcomePage} options={{headerShown: false}} />
    <SubStack.Screen name="ScreenSubscription" component={SubscriptionPage} options={{headerShown: false}} />
  </SubStack.Navigator>
);

const selectAuth = (state: RootState) => state.auth;
const selectSubscription = (state: RootState) => state.subscription;

const selectAuthAndSubscription = createSelector(
  [selectAuth, selectSubscription],
  (auth, subscription) => ({
    isAuthenticated: auth.isAuthenticated,
    isSubscribed: subscription.isSubscribed,
    isCheckingSubscription: subscription.isCheckingSubscription, 
  })
);

const Routes = () => {
  const { isAuthenticated, isSubscribed,isCheckingSubscription } = useSelector(selectAuthAndSubscription);

  if (isCheckingSubscription) {
    return (
      <View style={styles.loaderContainer}>
       <LottieView
          source={require('../Assets/LottieJSON/LoaderLottie.json')} 
          autoPlay
          loop
          speed={2}
          style={{ width: 200, height: 200 }} 
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isSubscribed ? (
          <SubscribedNavigator />
        ) : (
          <UnsubscribedNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};


export default Routes;
