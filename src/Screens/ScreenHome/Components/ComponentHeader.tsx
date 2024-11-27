import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutUser} from '../../utils/firebaseAuthentication';
import UserProfile from '../../../Assets/ImagesData/UserProfileLogo';
import styles from './StylesHeader';
import {RootState} from '../../../Redux/store';
import LogoutIcon from '../../../Assets/ImagesData/LogoutIcon';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [storedUserName, setStoredUserName] = useState<string | null>(null);

  const userName = useSelector((state: RootState) => state.auth.user?.name);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setStoredUserName(name);
        }
      } catch (error) {
        console.error('Failed to load user name from AsyncStorage', error);
      }
    };

    loadUserName();
  }, []);

  useEffect(() => {
    const saveUserName = async () => {
      if (userName) {
        try {
          await AsyncStorage.setItem('userName', userName);
          setStoredUserName(userName);
        } catch (error) {
          console.error('Failed to save user name to AsyncStorage', error);
        }
      }
    };

    saveUserName();
  }, [userName]);

  const handleLogout = async () => {
    logoutUser(dispatch);
  };

  const truncateName = (name: string | null) => {
    if (name && name.length > 7) {
      return `${name.slice(0, 7)}...`;
    }
    return name;
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.userSection}>
        <UserProfile />
        <Text style={styles.headerText}>
          Hey, {truncateName(storedUserName)}
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>
          <LogoutIcon />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
