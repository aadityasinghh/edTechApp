import React, { useEffect, useState } from 'react';
import Routes from './src/Routes/Routes';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { createTables } from './src/utils/storage/db';
import { StatusBar } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SplashScreen from './src/Screens/ScreenSplash/SplashScreen';

function App(): React.JSX.Element {
  const [isAppReady, setIsAppReady] = useState(false);


  useEffect(() => {
    createTables();
  }, []);

  const handleAppReady = () => {
    setIsAppReady(true); 
  };

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {!isAppReady ? (
        <SplashScreen onAppReady={handleAppReady} />  
      ) : (
        <Routes />  
      )}
    </Provider>
  );
}

export default App;
