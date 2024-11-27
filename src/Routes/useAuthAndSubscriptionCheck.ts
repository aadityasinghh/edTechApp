import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  subscribe,
  unsubscribe,
} from '../Screens/ScreenSubscription/redux/subscriptionSlice';

import {setUser} from '../Screens/redux/authSlice';
import {db} from '../utils/storage/db';
import {RootState} from '../Redux/store';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {User} from '../utils/interfaces/types';



export const useAuthAndSubscriptionCheck = () => {
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
            db.transaction(txn => {
              txn.executeSql(
                'SELECT subscribed_plan_id FROM users WHERE uid = ?',
                [uid],
                (txn, results) => {
                  if (results.rows.length > 0) {
                    const subscribedPlanId =
                      results.rows.item(0).subscribed_plan_id;
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
                },
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
      }   setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    checkAuthAndSubscription();
  }, []);

  return {isLoading, checkingSubscription};
};
