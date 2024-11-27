import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from '../ScreenSubscription/redux/subscriptionSlice';
import { setUser } from '../redux/authSlice';
import { db } from '../../utils/storage/db';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User } from '../../utils/interfaces/types';
import BrandLogo from '../../Assets/ImagesData/BrandLogo';
import { styles } from './SplashStyle';

const SplashScreen = ({ onAppReady }: { onAppReady: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [checkingSubscription, setCheckingSubscription] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAndSubscription = async () => {
      try {
        const token = await AsyncStorage.getItem('authorisationToken');
        if (token) {
          const currentUser = auth().currentUser;
          const googleUser = await GoogleSignin.getCurrentUser();

          let uid: string | null = null;

          if (currentUser) {
            uid = currentUser.uid;
          } else if (googleUser) {
            uid = googleUser.user.id;
          }

          if (uid) {
            setCheckingSubscription(true);
            db.transaction((txn) => {
              txn.executeSql(
                'SELECT subscribed_plan_id FROM users WHERE uid = ?',
                [uid],
                (txn, results) => {
                  if (results.rows.length > 0) {
                    const subscribedPlanId = results.rows.item(0).subscribed_plan_id;
                    if (subscribedPlanId) {
                      dispatch(subscribe(subscribedPlanId));
                    } else {
                      dispatch(unsubscribe());
                    }
                  } else {
                    dispatch(unsubscribe());
                  }
                  setCheckingSubscription(false);
                },
                () => {
                  dispatch(unsubscribe());
                  setCheckingSubscription(false);
                }
              );
            });

            const user: User = {
              email: currentUser?.email || googleUser?.user.email!,
              name: currentUser?.displayName || googleUser?.user.name!,
              password: '',
            };
            dispatch(setUser(user));
          } else {
            dispatch(setUser(null));
          }
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setUser(null));
      }
      setTimeout(() => {
        setIsLoading(false);
        onAppReady();  
      }, 1000);
    };

    checkAuthAndSubscription();
  }, [dispatch, onAppReady]);

  if (isLoading || checkingSubscription) {
    return (
      <View style={styles.container}>
        <BrandLogo />
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      </View>
    );
  }

  return null; 
};

export default SplashScreen;
