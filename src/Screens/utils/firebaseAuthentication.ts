import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../redux/authSlice';
import {User} from '../../utils/interfaces/types';
import {Alert} from 'react-native';
import {AppDispatch} from '../../Redux/store';
import { setCheckingSubscription, subscribe, unsubscribe } from '../ScreenSubscription/redux/subscriptionSlice';
import { db } from '../../utils/storage/db';

export const signupUser = async (user: User, dispatch: AppDispatch) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      user.email,
      user.password,
    );
    await userCredential.user.updateProfile({
      displayName: user.name,
    });
    const idToken = await userCredential.user.getIdToken();
    await AsyncStorage.setItem('authorisationToken', idToken);
    const newUser: User = {
      email: user.email,
      name: user.name,
      password: user.password,
    };
    dispatch(setUser(newUser));
  } catch (error) {
    Alert.alert('Cannot sign up, please try again.');
  }
};

export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();
    await AsyncStorage.setItem('authorisationToken', idToken);

    const currentUser = auth().currentUser;

    if (currentUser) {
      const user: User = {
        email: currentUser.email!,
        name: currentUser.displayName!,
        password: '',
      };
      let uid = currentUser.uid;

      dispatch(setUser(user));

      if (uid) {

        dispatch(setCheckingSubscription(true)); 
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
              dispatch(setCheckingSubscription(false));
            },
            () => {
              dispatch(unsubscribe());

              dispatch(setCheckingSubscription(false)); 
            }
          );
        });
      } else {
        dispatch(unsubscribe());
      }
    } else {
      dispatch(setUser(null));
    }
  } catch (error) {
    dispatch(setUser(null));
    Alert.alert(
      'Error occurred, cannot log you in. Please check your credentials and try again.',
    );
  }
};




export const loginWithGoogle = async (dispatch: AppDispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const idToken = await userCredential.user.getIdToken();
    await AsyncStorage.setItem('authorisationToken', idToken);

    const currentUser = auth().currentUser;

    if (currentUser) {
      const user: User = {
        email: currentUser.email!,
        name: currentUser.displayName!,
        password: '',
      };

      let uid = currentUser.uid;

      dispatch(setUser(user));

      if (uid) {
        dispatch(setCheckingSubscription(true)); 
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
              dispatch(setCheckingSubscription(false));
            },
            () => {
              dispatch(unsubscribe());

              dispatch(setCheckingSubscription(false)); 
            }
          );
        });
      } else {
        dispatch(unsubscribe());
      }
    } else {
      dispatch(setUser(null));
    }
  } catch (error) {
    dispatch(setUser(null));
    Alert.alert('Cannot log you in, please try again!');
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    const currentUser = auth().currentUser;

    if (currentUser) {
      await auth().signOut();
      await AsyncStorage.removeItem('authorisationToken');
      dispatch(setUser(null));
      dispatch(unsubscribe());
    }

    const isGoogleSignedIn = await GoogleSignin.getCurrentUser();

    if (isGoogleSignedIn) {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('authorisationToken');
      dispatch(setUser(null));
      dispatch(unsubscribe());
    }
  } catch (error) {
    console.error('Error logging out:', error);
    Alert.alert('Cannot log you out, please try again.');
  }
};
